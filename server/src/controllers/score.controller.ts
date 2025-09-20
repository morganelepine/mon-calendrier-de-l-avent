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
                status: 400,
                message: "All points for day opening have been awarded",
            };
        }

        if (reason === ScoreType.ContentOpening && scoreOfTheDay.length >= 4) {
            return {
                status: 400,
                message: "All points for content openings have been awarded",
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
                    status: 400,
                    message:
                        "Points for this question have already been awarded",
                };
            }

            if (scoreOfTheDay.length >= 3) {
                return {
                    status: 400,
                    message: "All points for the game have been awarded",
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

    async getLeaderboard() {
        const leaderboard = await prisma.user.findMany({
            orderBy: { score: "desc" },
            select: { username: true, score: true },
        });

        return leaderboard;
    }
}
