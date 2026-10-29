import { Request } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { isCronRequest } from "../lib/cronAuth";
import { ScoreType } from "./score.controller";

// Below this many opened boxes, a user isn't counted as a player.
const RETROSPECTIVE_MIN_DAYS = 6;
const LAST_DAY = 24;
const MAX_CORRECT_ANSWERS = LAST_DAY * 3;
const TIME_PROFILES = ["morning", "afternoon", "evening", "night"] as const;
// 0, 0.01, ..., 1 - points thresholds, one per percent.
const PERCENTILE_FRACTIONS = Array.from({ length: 101 }, (_, i) => i / 100);

interface RetrospectiveStatsData {
    playerCount: number;
    // Index = value, entry = number of players with that value.
    daysOpened: number[];
    longestStreak: number[];
    correctAnswers: number[];
    timeProfiles: Record<string, number>;
    pointsPercentiles: number[];
}

interface HistogramRow {
    key: number;
    players: bigint;
}

const getParisYear = (): number =>
    Number(
        new Date().toLocaleDateString("en-CA", {
            timeZone: "Europe/Paris",
            year: "numeric",
        }),
    );

const toHistogram = (rows: HistogramRow[], maxValue: number): number[] => {
    const histogram = new Array<number>(maxValue + 1).fill(0);
    for (const row of rows) histogram[row.key] = Number(row.players);
    return histogram;
};

const toPercent = (count: number, total: number): number =>
    total === 0 ? 0 : Math.round((count / total) * 100);

// Share of players with exactly `value`, and with strictly less.
const compare = (histogram: number[], value: number, total: number) => ({
    value,
    samePercent: toPercent(histogram[value] ?? 0, total),
    lowerPercent: toPercent(
        histogram.slice(0, value).reduce((sum, count) => sum + count, 0),
        total,
    ),
});

// Highest percentile reached by `points`, turned into "top X %" (at least 1).
const getTopPercent = (percentiles: number[], points: number): number => {
    let reached = 0;
    percentiles.forEach((threshold, index) => {
        if (threshold <= points) reached = index;
    });
    return Math.max(1, 100 - reached);
};

export class RetrospectiveController {
    // GET /retrospective/compute?year=2026
    // Vercel Cron, Dec 24th and 25th at midnight French time (see vercel.json).
    // The second run picks up offline scores flushed late. Idempotent.
    async compute(request: Request) {
        if (!isCronRequest(request)) {
            return { status: 401, message: "Unauthorized" };
        }

        const year = Number(request.query.year) || getParisYear();

        const players = await this.computeUserRetrospectives(year);
        const data = await this.computeStats(year);
        await prisma.retrospectiveStats.upsert({
            where: { year },
            create: { year, data: data as unknown as Prisma.InputJsonObject },
            update: {
                data: data as unknown as Prisma.InputJsonObject,
                computedAt: new Date(),
            },
        });

        return { status: 200, year, players };
    }

    // GET /retrospective/:uuid
    async getUserRetrospective(request: Request) {
        const user = await prisma.user.findUnique({
            where: { uuid: request.params.uuid },
        });
        if (!user) return { status: 404, message: "User not found" };

        const year = getParisYear();
        const [retrospective, stats] = await Promise.all([
            prisma.userRetrospective.findUnique({
                where: { userId_year: { userId: user.id, year } },
            }),
            prisma.retrospectiveStats.findUnique({ where: { year } }),
        ]);
        if (!retrospective || !stats) return { available: false };

        const data = stats.data as unknown as RetrospectiveStatsData;
        const total = data.playerCount;

        return {
            available: true,
            year,
            playerCount: total,
            openedDays: retrospective.openedDays,
            daysOpened: compare(
                data.daysOpened,
                retrospective.daysOpened,
                total,
            ),
            longestStreak: compare(
                data.longestStreak,
                retrospective.longestStreak,
                total,
            ),
            correctAnswers: compare(
                data.correctAnswers,
                retrospective.correctAnswers,
                total,
            ),
            timeProfile: {
                value: retrospective.timeProfile,
                samePercent: toPercent(
                    data.timeProfiles[retrospective.timeProfile] ?? 0,
                    total,
                ),
            },
            points: {
                value: retrospective.points,
                topPercent: getTopPercent(
                    data.pointsPercentiles,
                    retrospective.points,
                ),
            },
        };
    }

    // One row per player. Scores are filtered on the Christmas reasons,
    // since October boxes share the same year and day numbers.
    // Timestamps are stored in UTC but bucketed in French time.
    private async computeUserRetrospectives(year: number): Promise<number> {
        return prisma.$executeRaw`
            WITH openings AS (
                SELECT "userId", "day", MIN("earnedAt") AS "earnedAt",
                       (MIN("earnedAt") AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris')::date
                           = make_date(${year}::int, 12, "day") AS "onTime"
                FROM "Score"
                WHERE "year" = ${year}
                  AND "reason" = ${ScoreType.DayOpening}
                  AND "day" BETWEEN 1 AND ${LAST_DAY}
                GROUP BY "userId", "day"
            ),
            -- Every opened box counts to be a player, only on-time ones
            -- (opened on their own day) count in "daysOpened" and streaks.
            players AS (
                SELECT "userId",
                       (COUNT(*) FILTER (WHERE "onTime"))::int AS "daysOpened",
                       COALESCE(ARRAY_AGG("day" ORDER BY "day") FILTER (WHERE "onTime"), '{}') AS "openedDays"
                FROM openings
                GROUP BY "userId"
                HAVING COUNT(*) >= ${RETROSPECTIVE_MIN_DAYS}
            ),
            -- Consecutive days share the same day - row_number ("gaps and islands").
            -- No row for players without any on-time box: LEFT JOINed below.
            streaks AS (
                SELECT "userId", MAX(length)::int AS "longestStreak"
                FROM (
                    SELECT "userId", COUNT(*) AS length
                    FROM (
                        SELECT "userId",
                               "day" - ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "day") AS island
                        FROM openings
                        WHERE "onTime"
                    ) days
                    GROUP BY "userId", island
                ) islands
                GROUP BY "userId"
            ),
            profiles AS (
                SELECT DISTINCT ON ("userId") "userId", slot AS "timeProfile"
                FROM (
                    SELECT "userId",
                           CASE
                               WHEN hour >= 5 AND hour < 12 THEN 'morning'
                               WHEN hour >= 12 AND hour < 18 THEN 'afternoon'
                               WHEN hour >= 18 AND hour < 22 THEN 'evening'
                               ELSE 'night'
                           END AS slot
                    FROM (
                        SELECT "userId",
                               EXTRACT(HOUR FROM "earnedAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris') AS hour
                        FROM openings
                    ) hours
                ) slots
                GROUP BY "userId", slot
                ORDER BY "userId", COUNT(*) DESC, slot
            ),
            totals AS (
                SELECT "userId",
                       SUM("points")::int AS points,
                       (COUNT(*) FILTER (WHERE "reason" = ${ScoreType.GameAnswer} AND "points" > 0))::int AS "correctAnswers"
                FROM "Score"
                WHERE "year" = ${year}
                  AND "day" BETWEEN 1 AND ${LAST_DAY}
                  AND "reason" IN (${ScoreType.DayOpening}, ${ScoreType.ContentOpening}, ${ScoreType.GameAnswer})
                  AND "userId" IN (SELECT "userId" FROM players)
                GROUP BY "userId"
            )
            INSERT INTO "UserRetrospective"
                ("userId", "year", "daysOpened", "openedDays", "longestStreak", "correctAnswers", "points", "timeProfile")
            SELECT p."userId", ${year}, p."daysOpened", p."openedDays", COALESCE(s."longestStreak", 0),
                   t."correctAnswers", t.points, pr."timeProfile"
            FROM players p
            LEFT JOIN streaks s USING ("userId")
            JOIN profiles pr USING ("userId")
            JOIN totals t USING ("userId")
            ON CONFLICT ("userId", "year") DO UPDATE SET
                "daysOpened" = EXCLUDED."daysOpened",
                "openedDays" = EXCLUDED."openedDays",
                "longestStreak" = EXCLUDED."longestStreak",
                "correctAnswers" = EXCLUDED."correctAnswers",
                "points" = EXCLUDED."points",
                "timeProfile" = EXCLUDED."timeProfile",
                "computedAt" = CURRENT_TIMESTAMP`;
    }

    private async computeStats(year: number): Promise<RetrospectiveStatsData> {
        const histogram = (column: Prisma.Sql) => prisma.$queryRaw<
            HistogramRow[]
        >`
            SELECT ${column} AS key, COUNT(*) AS players
            FROM "UserRetrospective"
            WHERE "year" = ${year}
            GROUP BY 1`;

        const [
            daysOpened,
            longestStreak,
            correctAnswers,
            timeProfiles,
            [percentiles],
        ] = await Promise.all([
            histogram(Prisma.sql`"daysOpened"`),
            histogram(Prisma.sql`"longestStreak"`),
            histogram(Prisma.sql`"correctAnswers"`),
            prisma.userRetrospective.groupBy({
                by: ["timeProfile"],
                where: { year },
                _count: { _all: true },
            }),
            prisma.$queryRaw<{ thresholds: number[] | null }[]>`
                SELECT percentile_disc(${PERCENTILE_FRACTIONS}::float8[])
                       WITHIN GROUP (ORDER BY "points") AS thresholds
                FROM "UserRetrospective"
                WHERE "year" = ${year}`,
        ]);

        const timeProfileCounts = Object.fromEntries(
            TIME_PROFILES.map((profile) => [profile, 0]),
        );
        for (const row of timeProfiles) {
            timeProfileCounts[row.timeProfile] = row._count._all;
        }

        return {
            playerCount: Object.values(timeProfileCounts).reduce(
                (sum, count) => sum + count,
                0,
            ),
            daysOpened: toHistogram(daysOpened, LAST_DAY),
            longestStreak: toHistogram(longestStreak, LAST_DAY),
            correctAnswers: toHistogram(correctAnswers, MAX_CORRECT_ANSWERS),
            timeProfiles: timeProfileCounts,
            pointsPercentiles: percentiles?.thresholds ?? [],
        };
    }
}
