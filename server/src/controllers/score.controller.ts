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

    async saveScore(request: Request) {
        const { userUuid, dayId, points, reason, questionNumber } =
            request.body;

        const user = await this.getUser(userUuid);
        if (!user) return { status: 404, message: "User not found" };

        const scoreOfTheDay = await prisma.score.findMany({
            where: {
                userId: user.id,
                day: dayId,
                reason: reason,
            },
        });

        if (reason === ScoreType.DayOpening && scoreOfTheDay.length >= 1) {
            return {
                status: 200,
                message: "All points for day opening have already been awarded",
                alreadyAwarded: true,
                totalScore: user.score,
            };
        }

        if (reason === ScoreType.ContentOpening && scoreOfTheDay.length >= 4) {
            return {
                status: 200,
                message:
                    "All points for content openings have already been awarded",
                alreadyAwarded: true,
                totalScore: user.score,
            };
        }

        if (reason === ScoreType.GameAnswer) {
            const gameAlreadyPlayed = await prisma.score.findFirst({
                where: {
                    userId: user.id,
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
                    totalScore: user.score,
                };
            }

            if (scoreOfTheDay.length >= 3) {
                return {
                    status: 200,
                    message:
                        "All points for the game have already been awarded",
                    alreadyAwarded: true,
                    totalScore: user.score,
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
            },
        });

        // Update user total score
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { score: user.score + points },
        });

        return {
            status: 200,
            message: "Score is saved",
            score: createdScore,
            totalScore: updatedUser.score,
        };

        // Errors (DB, etc.) are forwarded to the centralized handler in index.ts,
        // which logs them with Sentry and returns a 500 response.
    }

    async getUserTotalScore(request: Request) {
        const uuid = request.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        return { totalScore: user.score };
    }

    async getUserScoresByDay(request: Request) {
        const uuid = request.params.uuid;
        const user = await this.getUser(uuid);
        if (!user) return { status: 404, message: "User not found" };

        const scores = await prisma.score.findMany({
            where: { userId: user.id },
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

    async getLeaderboard(req: Request) {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

        const users = await prisma.user.findMany({
            where: {
                score: {
                    gt: 0, // greater than 0
                },
                updatedAt: {
                    gte: fiveDaysAgo,
                },
            },
            select: {
                username: true,
                score: true,
                scoreHistory: {
                    // get last earned score
                    select: { earnedAt: true },
                    orderBy: { earnedAt: "desc" },
                    take: 1,
                },
            },
        });

        const leaderboard = [...users].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            const aTime = a.scoreHistory[0]?.earnedAt?.getTime() ?? Infinity;
            const bTime = b.scoreHistory[0]?.earnedAt?.getTime() ?? Infinity;
            return aTime - bTime;
        });

        if (!req.query.page && !req.query.limit) {
            return leaderboard.map((u) => ({
                username: u.username,
                score: u.score,
            }));
        }

        const page = Number.parseInt(req.query.page as string) || 1;
        const limit = Number.parseInt(req.query.limit as string) || 75;
        const skip = (page - 1) * limit;

        const leaderboardPage = leaderboard.slice(skip, skip + limit);
        const hasMore = skip + leaderboardPage.length < leaderboard.length;

        return {
            data: leaderboardPage.map((u) => ({
                username: u.username,
                score: u.score,
            })),
            total: leaderboard.length,
            hasMore,
        };
    }
}
