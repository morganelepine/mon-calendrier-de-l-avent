import { Request } from "express";
import { prisma } from "../lib/prisma";

const GAME_2048 = "2048";
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

// Server's own clock, never the client's - a phone with its date changed
// can't backdate/forward-date a submission onto a different playDate.
function todayPlayDate(): string {
    return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function daysBetween(first: string, second: string): number {
    return Math.round(
        (new Date(first).getTime() - new Date(second).getTime()) /
            MILLISECONDS_IN_A_DAY,
    );
}

function getCurrentStreak(results: Array<{ playDate: string }>): number {
    let streak = 0;
    for (let i = 0; i < results.length; i++) {
        if (
            i > 0 &&
            daysBetween(results[i - 1].playDate, results[i].playDate) !== 1
        ) {
            break;
        }
        streak++;
    }

    if (
        results.length > 0 &&
        daysBetween(todayPlayDate(), results[0].playDate) > 1
    ) {
        return 0;
    }
    return streak;
}

function getLongestStreak(results: Array<{ playDate: string }>): number {
    let best = 0;
    let run = 0;
    for (let i = 0; i < results.length; i++) {
        run =
            i > 0 &&
            daysBetween(results[i].playDate, results[i - 1].playDate) === 1
                ? run + 1
                : 1;
        best = Math.max(best, run);
    }
    return best;
}

export class Games2048Controller {
    async getUser(uuid: string) {
        return prisma.user.findUnique({ where: { uuid } });
    }

    // One row per user per day (see schema.prisma): replaying the same day
    // only ever updates it, and only when the new score is actually better.
    async submitScore(request: Request) {
        const { userUuid, score, won } = request.body;
        const user = await this.getUser(userUuid);
        if (!user) return { status: 404, message: "User not found" };

        const playDate = todayPlayDate();

        const existing = await prisma.dailyGameResult.findUnique({
            where: {
                userId_game_playDate: {
                    userId: user.id,
                    game: GAME_2048,
                    playDate,
                },
            },
        });

        if (existing) {
            if (score <= existing.score) {
                return {
                    status: 200,
                    message: "Score not improved, previous best kept",
                    isNewBest: false,
                    result: existing,
                };
            }

            const updated = await prisma.dailyGameResult.update({
                where: { id: existing.id },
                data: {
                    score,
                    won: existing.won || Boolean(won),
                    attempts: { increment: 1 },
                },
            });

            return {
                status: 200,
                message: "Best score updated",
                isNewBest: true,
                result: updated,
            };
        }

        const created = await prisma.dailyGameResult.create({
            data: {
                userId: user.id,
                game: GAME_2048,
                playDate,
                score,
                won: Boolean(won),
            },
        });

        return {
            status: 200,
            message: "Score saved",
            isNewBest: true,
            result: created,
        };
    }

    // Same shape as ScoreController.buildLeaderboard:
    // - everyone by default so there's always something to compare against
    // - narrowed to one group's members when `groupId` is given.
    private async buildLeaderboard(playDate: string, groupId?: number) {
        let userIdFilter: number[] | undefined;
        if (groupId) {
            const members = await prisma.groupMember.findMany({
                where: { groupId },
                select: { userId: true },
            });
            userIdFilter = members.map((member) => member.userId);
        }

        const results = await prisma.dailyGameResult.findMany({
            where: {
                game: GAME_2048,
                playDate,
                ...(userIdFilter ? { userId: { in: userIdFilter } } : {}),
            },
            include: { user: { select: { username: true } } },
            orderBy: [{ score: "desc" }, { createdAt: "asc" }],
        });

        return results.map((result) => ({
            userId: result.userId,
            username: result.user.username,
            score: result.score,
            won: result.won,
        }));
    }

    async getLeaderboard(req: Request) {
        const playDate = (req.query.playDate as string) || todayPlayDate();
        const groupId = req.query.groupId
            ? Number(req.query.groupId)
            : undefined;
        const leaderboard = await this.buildLeaderboard(playDate, groupId);

        if (!req.query.page && !req.query.limit) {
            return leaderboard;
        }

        const page = Number.parseInt(req.query.page as string) || 1;
        const limit = Number.parseInt(req.query.limit as string) || 30;
        const skip = (page - 1) * limit;

        const leaderboardPage = leaderboard.slice(skip, skip + limit);
        const hasMore = skip + leaderboardPage.length < leaderboard.length;

        return {
            data: leaderboardPage,
            total: leaderboard.length,
            hasMore,
        };
    }

    // Same "window around one player" idea as ScoreController.getLeaderboardAround,
    // so someone far down the global ranking can find their own spot in one call.
    async getLeaderboardAround(req: Request) {
        const uuid = req.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        const playDate = (req.query.playDate as string) || todayPlayDate();
        const groupId = req.query.groupId
            ? Number(req.query.groupId)
            : undefined;
        const leaderboard = await this.buildLeaderboard(playDate, groupId);

        const userIndex = leaderboard.findIndex((e) => e.userId === user.id);
        if (userIndex === -1) {
            return { userHasScore: false };
        }

        const before = Number.parseInt(req.query.before as string) || 10;
        const after = Number.parseInt(req.query.after as string) || 10;
        const total = leaderboard.length;

        const startIndex = Math.max(0, userIndex - before);
        const endIndex = Math.min(total - 1, userIndex + after);
        const windowEntries = leaderboard.slice(startIndex, endIndex + 1);

        return {
            userHasScore: true,
            userRank: userIndex + 1, // 1-based
            total,
            hasMoreAbove: startIndex > 0,
            hasMoreBelow: endIndex < total - 1,
            data: windowEntries.map((entry, i) => ({
                ...entry,
                rank: startIndex + i + 1,
            })),
        };
    }

    // Personal stats: everything here is derived from the rows already stored.
    async getStats(req: Request) {
        const uuid = req.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        const results = await prisma.dailyGameResult.findMany({
            where: { userId: user.id, game: GAME_2048 },
            orderBy: { playDate: "desc" },
        });

        const gamesPlayed = results.length;
        const wins = results.filter((result) => result.won).length;
        const winRatePercent = gamesPlayed
            ? Math.round((wins / gamesPlayed) * 100)
            : 0;

        const currentStreak = getCurrentStreak(results);
        const chronological = [...results].reverse();
        const bestStreak = getLongestStreak(chronological);

        // Best score ever, and the day it was set - ties keep the earliest.
        const best = [...results].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.playDate.localeCompare(b.playDate);
        })[0];

        return {
            gamesPlayed,
            winRatePercent,
            currentStreak,
            bestStreak,
            bestScore: best?.score ?? 0,
            bestScoreDate: best?.playDate ?? null,
        };
    }
}
