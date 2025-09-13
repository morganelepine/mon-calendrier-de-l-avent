import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { ScoreType } from "../enums/enums";

const prisma = new PrismaClient();

export class ScoreController {
    async getUser(uuid: string) {
        return prisma.user.findUnique({ where: { uuid } });
    }

    async awardPoints(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const { userUuid, dayId, points, reason, questionNumber } =
            request.body;

        const user = await this.getUser(userUuid);
        if (!user) return "User not found";

        const scoreOfTheDay = await prisma.score.findMany({
            where: {
                userId: user.id,
                day: dayId,
                reason: reason,
            },
        });

        if (reason === ScoreType.DayOpening && scoreOfTheDay.length >= 1) {
            return "All points for day opening have been awarded";
        }

        if (reason === ScoreType.ContentOpening && scoreOfTheDay.length >= 4) {
            return "All points for content openings have been awarded";
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
                return "Points for this question have already been awarded";
            }

            if (scoreOfTheDay.length >= 3) {
                return "All points for the game have been awarded";
            }
        }

        // Create score
        await prisma.score.create({
            data: {
                userId: user.id,
                day: dayId,
                points,
                reason,
                questionNumber,
            },
        });

        // Update user total score
        await prisma.user.update({
            where: { id: user.id },
            data: { score: user.score + points },
        });

        return "Score is saved";
    }

    async getUserTotalScore(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const uuid = request.params.uuid;

        const user = await prisma.user.findUnique({
            where: { uuid },
        });

        if (!user) return "Unregistered user";

        return { totalScore: user.score };
    }

    async getUserScoresByDay(request: Request, response: Response) {
        const uuid = request.params.uuid;

        const user = await prisma.user.findUnique({
            where: { uuid },
        });

        if (!user) return "Unregistered user";

        const scores = await prisma.score.findMany({
            where: { userId: user.id },
            orderBy: { day: "asc" },
        });

        const scoresByDay: Record<
            number,
            {
                dayNumber: number;
                scoreTotal: number;
                scoreDetails: {
                    dayOpening: number;
                    contentOpening: number;
                    gameAnswer: number;
                };
            }
        > = {};

        for (const score of scores) {
            if (!scoresByDay[score.day]) {
                scoresByDay[score.day] = {
                    dayNumber: score.day,
                    scoreTotal: 0,
                    scoreDetails: {
                        dayOpening: 0,
                        contentOpening: 0,
                        gameAnswer: 0,
                    },
                };
            }

            scoresByDay[score.day].scoreTotal += score.points;

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

    async getLeaderboard(request: Request, response: Response) {
        const leaderboard = await prisma.user.findMany({
            orderBy: { score: "desc" },
            select: { username: true, score: true },
        });

        return leaderboard;
    }
}
