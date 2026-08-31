import { Request } from "express";
import { prisma } from "../lib/prisma";

const GAME_2048 = "2048";

export class Games2048Controller {
    async getUser(uuid: string) {
        return prisma.user.findUnique({ where: { uuid } });
    }

    // One row per user per game (see schema.prisma): replaying only ever
    // updates it, and only when the new score actually beats the existing one..
    async submitScore(request: Request) {
        const { userUuid, score } = request.body;
        const user = await this.getUser(userUuid);
        if (!user) return { status: 404, message: "User not found" };

        const existing = await prisma.gameHighScore.findUnique({
            where: { userId_game: { userId: user.id, game: GAME_2048 } },
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

            const updated = await prisma.gameHighScore.update({
                where: { id: existing.id },
                data: { score, achievedAt: new Date() },
            });

            return {
                status: 200,
                message: "Best score updated",
                isNewBest: true,
                result: updated,
            };
        }

        const created = await prisma.gameHighScore.create({
            data: { userId: user.id, game: GAME_2048, score },
        });

        return {
            status: 200,
            message: "Score saved",
            isNewBest: true,
            result: created,
        };
    }

    private async resolveGroupUserIds(
        groupId?: number,
    ): Promise<number[] | undefined> {
        if (!groupId) return undefined;
        const members = await prisma.groupMember.findMany({
            where: { groupId },
            select: { userId: true },
        });
        return members.map((member) => member.userId);
    }

    // Same shape as ScoreController.buildLeaderboard:
    // - everyone by default so there's always something to compare against
    // - narrowed to one group's members when `groupId` is given.
    private async buildLeaderboard(groupId?: number) {
        const userIdFilter = await this.resolveGroupUserIds(groupId);

        const results = await prisma.gameHighScore.findMany({
            where: {
                game: GAME_2048,
                ...(userIdFilter ? { userId: { in: userIdFilter } } : {}),
            },
            include: { user: { select: { username: true } } },
            orderBy: [{ score: "desc" }, { achievedAt: "asc" }],
        });

        return results.map((result) => ({
            userId: result.userId,
            username: result.user.username,
            score: result.score,
        }));
    }

    async getLeaderboard(req: Request) {
        const groupId = req.query.groupId
            ? Number(req.query.groupId)
            : undefined;
        const leaderboard = await this.buildLeaderboard(groupId);

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
    // so someone far down the ranking can find their own spot in one call.
    async getLeaderboardAround(req: Request) {
        const uuid = req.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        const groupId = req.query.groupId
            ? Number(req.query.groupId)
            : undefined;
        const leaderboard = await this.buildLeaderboard(groupId);

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

    // Personal best: the row itself, or nulls if this user has never
    // submitted a score for this game.
    async getStats(req: Request) {
        const uuid = req.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        const best = await prisma.gameHighScore.findUnique({
            where: { userId_game: { userId: user.id, game: GAME_2048 } },
        });

        return {
            bestScore: best?.score ?? 0,
            achievedAt: best?.achievedAt ?? null,
        };
    }
}
