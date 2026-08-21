import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

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
}

export class ScoreController {
    async getUser(uuid: string) {
        return prisma.user.findUnique({ where: { uuid } });
    }

    async getUserYearScore(userId: number, year: number): Promise<number> {
        const result = await prisma.score.aggregate({
            where: { userId, year },
            _sum: { points: true },
        });
        return result._sum.points ?? 0;
    }

    async saveScore(request: Request) {
        const { userUuid, dayId, points, reason, questionNumber } =
            request.body;
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

        if (reason === ScoreType.ContentOpening && scoreOfTheDay.length >= 4) {
            return {
                status: 200,
                message:
                    "All points for content openings have already been awarded",
                alreadyAwarded: true,
                totalScore,
            };
        }

        if (reason === ScoreType.GameAnswer) {
            const gameAlreadyPlayed = await prisma.score.findFirst({
                where: {
                    userId: user.id,
                    year,
                    day: dayId,
                    reason: ScoreType.GameAnswer,
                    questionNumber: questionNumber,
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

        // Create score
        const createdScore = await prisma.score.create({
            data: {
                userId: user.id,
                day: dayId,
                points,
                reason,
                questionNumber,
                year,
            },
        });

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

    // Ranks this season's players only: grouping Score rows by user for the
    // current year both computes each user's total and doubles as the
    // "has this user scored anything this year" filter (a user with no rows
    // for the year simply doesn't come out of groupBy).
    async getLeaderboard(req: Request) {
        const currentYear = new Date().getFullYear();

        // Group by userId to get each user's total score for the current year,
        // and also get the last time they earned points (to break ties).
        const totals = await prisma.score.groupBy({
            by: ["userId"],
            where: { year: currentYear },
            _sum: { points: true },
            _max: { earnedAt: true },
            having: { points: { _sum: { gt: 0 } } },
        });

        // Get the usernames for the users in the leaderboard.
        const users = await prisma.user.findMany({
            where: { id: { in: totals.map((t) => t.userId) } },
            select: { id: true, username: true },
        });
        const usernameById = new Map(users.map((u) => [u.id, u.username]));

        // Sort the leaderboard by score (descending)
        // and then by last earned time (ascending).
        const leaderboard = totals
            .map((t) => ({
                username: usernameById.get(t.userId) ?? "",
                score: t._sum.points ?? 0,
                lastEarnedAt: t._max.earnedAt,
            }))
            .sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                const aTime = a.lastEarnedAt?.getTime() ?? Infinity;
                const bTime = b.lastEarnedAt?.getTime() ?? Infinity;
                return aTime - bTime;
            });

        if (!req.query.page && !req.query.limit) {
            return leaderboard.map(({ username, score }) => ({
                username,
                score,
            }));
        }

        const page = Number.parseInt(req.query.page as string) || 1;
        const limit = Number.parseInt(req.query.limit as string) || 75;
        const skip = (page - 1) * limit;

        const leaderboardPage = leaderboard.slice(skip, skip + limit);
        const hasMore = skip + leaderboardPage.length < leaderboard.length;

        return {
            data: leaderboardPage.map(({ username, score }) => ({
                username,
                score,
            })),
            total: leaderboard.length,
            hasMore,
        };
    }
}
