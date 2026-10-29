import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { ScoreType } from "../src/controllers/score.controller";

// Dev only: fills December (days 1-24) with scores for one user plus
// fake players, so /retrospective/compute has something to work on.
// Usage: npx ts-node scripts/seedRetrospective.ts <userId> [--clean]
// --clean removes everything this script added.

const FAKE_PLAYER_COUNT = 60;
const FAKE_PREFIX = "retro-seed-";
const year = Number(
    new Date().toLocaleDateString("en-CA", {
        timeZone: "Europe/Paris",
        year: "numeric",
    }),
);
const decemberStart = new Date(Date.UTC(year, 11, 1) - 3_600_000);

interface Profile {
    openDays: number[];
    parisHours: [number, number];
    contentsPerDay: number;
    correctRate: number;
}

// Deterministic PRNG (mulberry32) so reruns produce the same data.
const createRandom = (seed: number) => (): number => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// December is UTC+1 in Paris.
const parisDate = (day: number, hour: number, minute: number): Date =>
    new Date(Date.UTC(year, 11, day, hour - 1, minute));

const buildScores = (userId: number, profile: Profile, random: () => number) =>
    profile.openDays.flatMap((day) => {
        const [minHour, maxHour] = profile.parisHours;
        const hour = minHour + Math.floor(random() * (maxHour - minHour + 1));
        const openedAt = parisDate(day, hour % 24, Math.floor(random() * 50));
        const at = (minutes: number) =>
            new Date(openedAt.getTime() + minutes * 60_000);
        const base = { userId, day, year };

        return [
            { ...base, points: 40, reason: ScoreType.DayOpening, earnedAt: openedAt },
            ...Array.from({ length: profile.contentsPerDay }, (_, i) => ({
                ...base,
                points: 20,
                reason: ScoreType.ContentOpening,
                itemNumber: i + 1,
                earnedAt: at(i + 1),
            })),
            ...[1, 2, 3].map((itemNumber) => ({
                ...base,
                points: random() < profile.correctRate ? 20 : 0,
                reason: ScoreType.GameAnswer,
                itemNumber,
                earnedAt: at(5 + itemNumber),
            })),
        ];
    });

const randomProfile = (random: () => number): Profile => {
    const openRate = 0.2 + random() * 0.8;
    const slots: [number, number][] = [[6, 11], [12, 17], [18, 21], [22, 25]];
    return {
        openDays: Array.from({ length: 24 }, (_, i) => i + 1).filter(
            () => random() < openRate,
        ),
        parisHours: slots[Math.floor(random() * slots.length)],
        contentsPerDay: Math.floor(random() * 5),
        correctRate: random(),
    };
};

async function addYearPoints(userId: number, points: number): Promise<void> {
    const now = new Date();
    await prisma.userYearScore.upsert({
        where: { userId_year: { userId, year } },
        create: { userId, year, total: points, lastEarnedAt: now },
        update: { total: { increment: points } },
    });
}

async function seed(userId: number): Promise<void> {
    const random = createRandom(userId);

    // Misses days 7 and 15: 22 boxes, longest streak 9 (16-24), mostly mornings.
    const targetScores = buildScores(
        userId,
        {
            openDays: Array.from({ length: 24 }, (_, i) => i + 1).filter(
                (day) => day !== 7 && day !== 15,
            ),
            parisHours: [7, 9],
            contentsPerDay: 4,
            correctRate: 0.8,
        },
        random,
    );
    await prisma.score.createMany({ data: targetScores });
    await addYearPoints(
        userId,
        targetScores.reduce((sum, score) => sum + score.points, 0),
    );

    for (let i = 1; i <= FAKE_PLAYER_COUNT; i++) {
        const name = `${FAKE_PREFIX}${i}`;
        const fake = await prisma.user.upsert({
            where: { uuid: name },
            create: { uuid: name, username: name },
            update: {},
        });
        const scores = buildScores(fake.id, randomProfile(random), random);
        if (scores.length === 0) continue;
        await prisma.score.createMany({ data: scores });
        await addYearPoints(
            fake.id,
            scores.reduce((sum, score) => sum + score.points, 0),
        );
    }

    console.log(
        `Seeded user ${userId} (${targetScores.length} scores) and ${FAKE_PLAYER_COUNT} fake players for ${year}.`,
    );
}

async function clean(userId: number): Promise<void> {
    const fakes = await prisma.user.findMany({
        where: { uuid: { startsWith: FAKE_PREFIX } },
        select: { id: true },
    });
    const fakeIds = fakes.map((fake) => fake.id);

    const where = {
        year,
        earnedAt: { gte: decemberStart },
        reason: {
            in: [
                ScoreType.DayOpening,
                ScoreType.ContentOpening,
                ScoreType.GameAnswer,
            ],
        },
    };
    const removed = await prisma.score.aggregate({
        where: { ...where, userId },
        _sum: { points: true },
    });

    await prisma.$transaction([
        prisma.score.deleteMany({ where: { ...where, userId } }),
        prisma.userYearScore.update({
            where: { userId_year: { userId, year } },
            data: { total: { decrement: removed._sum.points ?? 0 } },
        }),
        prisma.score.deleteMany({ where: { userId: { in: fakeIds } } }),
        prisma.userYearScore.deleteMany({ where: { userId: { in: fakeIds } } }),
        prisma.userRetrospective.deleteMany({ where: { year } }),
        prisma.retrospectiveStats.deleteMany({ where: { year } }),
        prisma.user.deleteMany({ where: { id: { in: fakeIds } } }),
    ]);

    console.log(`Cleaned ${year} seed data for user ${userId} and ${fakeIds.length} fake players.`);
}

async function main(): Promise<void> {
    // In prod, DATABASE_URL is the shared content database.
    if (process.env.DATABASE_URL === process.env.CONTENT_DATABASE_URL) {
        throw new Error("DATABASE_URL looks like production, aborting.");
    }

    const userId = Number(process.argv[2]);
    if (!userId) {
        throw new Error(
            "Usage: npx ts-node scripts/seedRetrospective.ts <userId> [--clean]",
        );
    }
    if (!(await prisma.user.findUnique({ where: { id: userId } }))) {
        throw new Error(`User ${userId} not found.`);
    }

    if (process.argv.includes("--clean")) await clean(userId);
    else await seed(userId);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
