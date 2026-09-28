import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export interface Score {
    dayNumber: number;
    dayIsOpen: boolean;
    scoreDetails: ScoreDetail;
}

export interface ScoreDetail {
    dayOpening: number;
    contentOpening: number;
    gameAnswer: number;
}

export enum ScoreType {
    ContentOpening = "ContentOpening",
    GameAnswer = "GameAnswer",
    DayOpening = "DayOpening",
    OctoberOpening = "OctoberOpening", // Just a record that the day was opened
}

export class ScoreController {
    async getUser(uuid: string) {
        return prisma.user.findUnique({ where: { uuid } });
    }

    async getUserYearScore(userId: number, year: number): Promise<number> {
        const yearScore = await prisma.userYearScore.findUnique({
            where: { userId_year: { userId, year } },
            select: { total: true },
        });
        return yearScore?.total ?? 0;
    }

    async saveScore(request: Request) {
        const { userUuid, dayId, points, reason, itemNumber } = request.body;
        const year = new Date().getFullYear();

        const user = await this.getUser(userUuid);
        if (!user) return { status: 404, message: "User not found" };

        const totalScore = await this.getUserYearScore(user.id, year);

        const scoreOfTheDay = await prisma.score.findMany({
            where: {
                userId: user.id,
                year,
                day: dayId,
                reason: reason,
            },
        });

        if (reason === ScoreType.DayOpening && scoreOfTheDay.length >= 1) {
            return {
                status: 200,
                message: "All points for day opening have already been awarded",
                alreadyAwarded: true,
                totalScore,
            };
        }

        if (reason === ScoreType.OctoberOpening && scoreOfTheDay.length >= 1) {
            return {
                status: 200,
                message: "October day opening has already been recorded",
                alreadyAwarded: true,
                totalScore,
            };
        }

        if (reason === ScoreType.ContentOpening) {
            const contentAlreadyOpened = await prisma.score.findFirst({
                where: {
                    userId: user.id,
                    year,
                    day: dayId,
                    reason: ScoreType.ContentOpening,
                    itemNumber: itemNumber,
                },
            });

            if (contentAlreadyOpened) {
                return {
                    status: 200,
                    message:
                        "Points for this content have already been awarded",
                    alreadyAwarded: true,
                    totalScore,
                };
            }

            if (scoreOfTheDay.length >= 4) {
                return {
                    status: 200,
                    message:
                        "All points for content openings have already been awarded",
                    alreadyAwarded: true,
                    totalScore,
                };
            }
        }

        if (reason === ScoreType.GameAnswer) {
            const gameAlreadyPlayed = await prisma.score.findFirst({
                where: {
                    userId: user.id,
                    year,
                    day: dayId,
                    reason: ScoreType.GameAnswer,
                    itemNumber: itemNumber,
                },
            });

            if (gameAlreadyPlayed) {
                return {
                    status: 200,
                    message:
                        "Points for this question have already been awarded",
                    alreadyAwarded: true,
                    totalScore,
                };
            }

            if (scoreOfTheDay.length >= 3) {
                return {
                    status: 200,
                    message:
                        "All points for the game have already been awarded",
                    alreadyAwarded: true,
                    totalScore,
                };
            }
        }

        // Create score, and add it to the user's yearly total
        // in the same transaction so the two can never drift apart.
        // The upsert's increment is atomic, so concurrent saves
        // (e.g. a pending-scores flush) add up instead of overwriting each other.
        const earnedAt = new Date();
        const [createdScore] = await prisma.$transaction([
            prisma.score.create({
                data: {
                    userId: user.id,
                    day: dayId,
                    points,
                    reason,
                    itemNumber,
                    year,
                    earnedAt,
                },
            }),
            prisma.userYearScore.upsert({
                where: { userId_year: { userId: user.id, year } },
                create: {
                    userId: user.id,
                    year,
                    total: points,
                    lastEarnedAt: earnedAt,
                },
                update: {
                    total: { increment: points },
                    lastEarnedAt: earnedAt,
                },
            }),
        ]);

        return {
            status: 200,
            message: "Score is saved",
            score: createdScore,
            totalScore: totalScore + points,
        };

        // Errors (DB, etc.) are forwarded to the centralized handler in index.ts,
        // which logs them with Sentry and returns a 500 response.
    }

    async getUserTotalScore(request: Request) {
        const uuid = request.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        const currentYear = new Date().getFullYear();
        const [totalScore, previousYearScore] = await Promise.all([
            this.getUserYearScore(user.id, currentYear),
            this.getUserYearScore(user.id, currentYear - 1),
        ]);

        return { totalScore, previousYearScore };
    }

    async getUserScoresByDay(request: Request) {
        const uuid = request.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        const currentYear = new Date().getFullYear();
        const scores = await prisma.score.findMany({
            where: { userId: user.id, year: currentYear },
            orderBy: { day: "asc" },
        });

        const scoresByDay: Record<number, Score> = {};

        for (let day = 1; day <= 24; day++) {
            scoresByDay[day] = {
                dayNumber: day,
                dayIsOpen: false,
                scoreDetails: {
                    dayOpening: 0,
                    contentOpening: 0,
                    gameAnswer: 0,
                },
            };
        }

        for (const score of scores) {
            if (!scoresByDay[score.day]) continue;
            scoresByDay[score.day].dayIsOpen = true;

            switch (score.reason) {
                case ScoreType.DayOpening:
                    scoresByDay[score.day].scoreDetails.dayOpening +=
                        score.points;
                    break;
                case ScoreType.ContentOpening:
                    scoresByDay[score.day].scoreDetails.contentOpening +=
                        score.points;
                    break;
                case ScoreType.GameAnswer:
                    scoresByDay[score.day].scoreDetails.gameAnswer +=
                        score.points;
                    break;
            }
        }

        return Object.values(scoresByDay);
    }

    private rankedWhere(year: number) {
        return { year, total: { gt: 0 } };
    }

    private readonly rankingOrder = [
        { total: "desc" },
        { lastEarnedAt: "asc" },
        { userId: "asc" },
    ] as const;

    private async readLeaderboard(year: number, skip?: number, take?: number) {
        const rows = await prisma.userYearScore.findMany({
            where: this.rankedWhere(year),
            orderBy: [...this.rankingOrder],
            skip,
            take,
            select: { total: true, user: { select: { username: true } } },
        });
        return rows.map((row) => ({
            username: row.user.username,
            score: row.total,
        }));
    }

    async getLeaderboard(req: Request, res: Response) {
        const currentYear = new Date().getFullYear();

        // Same ranking for everyone, so Vercel's CDN can serve it
        // to all players without invoking the function.
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=30, stale-while-revalidate=30",
        );

        if (!req.query.page && !req.query.limit) {
            return this.readLeaderboard(currentYear);
        }

        const page = Number.parseInt(req.query.page as string) || 1;
        const limit = Number.parseInt(req.query.limit as string) || 25;
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.readLeaderboard(currentYear, skip, limit),
            prisma.userYearScore.count({
                where: this.rankedWhere(currentYear),
            }),
        ]);

        return {
            data,
            total,
            hasMore: skip + data.length < total,
        };
    }

    // Returns a window of the leaderboard centered on one player,
    // so a player ranked e.g. 1000th can see their spot in a single request
    // instead of paging through everyone ahead of them.
    async getLeaderboardAround(req: Request) {
        const uuid = req.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        const currentYear = new Date().getFullYear();
        const mine = await prisma.userYearScore.findUnique({
            where: { userId_year: { userId: user.id, year: currentYear } },
        });
        if (!mine || mine.total <= 0) {
            // Known user, but no points yet this season.
            return { userHasScore: false };
        }

        // Everyone ranked ahead of this player, following rankingOrder.
        const [aheadCount, total] = await Promise.all([
            prisma.userYearScore.count({
                where: {
                    ...this.rankedWhere(currentYear),
                    OR: [
                        { total: { gt: mine.total } },
                        {
                            total: mine.total,
                            lastEarnedAt: { lt: mine.lastEarnedAt },
                        },
                        {
                            total: mine.total,
                            lastEarnedAt: mine.lastEarnedAt,
                            userId: { lt: mine.userId },
                        },
                    ],
                },
            }),
            prisma.userYearScore.count({
                where: this.rankedWhere(currentYear),
            }),
        ]);
        const userIndex = aheadCount;

        const before = Number.parseInt(req.query.before as string) || 10;
        const after = Number.parseInt(req.query.after as string) || 10;

        const startIndex = Math.max(0, userIndex - before);
        const endIndex = Math.min(total - 1, userIndex + after);
        const windowEntries = await this.readLeaderboard(
            currentYear,
            startIndex,
            endIndex - startIndex + 1,
        );

        return {
            userHasScore: true,
            userRank: userIndex + 1, // 1-based
            total,
            hasMoreAbove: startIndex > 0,
            hasMoreBelow: endIndex < total - 1,
            data: windowEntries.map((e, i) => ({
                username: e.username,
                score: e.score,
                rank: startIndex + i + 1,
            })),
        };
    }
}
