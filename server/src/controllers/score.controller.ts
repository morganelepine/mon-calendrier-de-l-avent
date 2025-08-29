import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

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
        const { userUuid, dayId, points, reason } = request.body;

        const user = await this.getUser(userUuid);
        if (!user) return "User not found";

        const scoreOfTheDay = await prisma.score.findMany({
            where: {
                userId: user.id,
                day: dayId,
                reason: reason,
            },
        });

        if (
            reason === "l'ouverture d'un contenu" &&
            scoreOfTheDay.length >= 5
        ) {
            return "All points for content openings have been awarded";
        }
        if (
            reason === "une bonne réponse à un jeu" &&
            scoreOfTheDay.length >= 4
        ) {
            return "All points for the game have been awarded";
        }

        // Créer le score
        await prisma.score.create({
            data: {
                userId: user.id,
                day: dayId,
                points,
                reason,
            },
        });

        // Mettre à jour le score total de l'utilisateur
        await prisma.user.update({
            where: { id: user.id },
            data: { score: user.score + points },
        });

        return "Score is saved";
    }

    async getUserScore(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const uuid = request.params.uuid;

        const user = await prisma.user.findUnique({
            where: { uuid },
        });

        if (!user) return "Unregistered user";

        // On regroupe les scores directement par date côté Prisma
        const scoresGrouped = await prisma.score.groupBy({
            by: ["earnedAt"],
            where: { userId: user.id },
            _sum: { points: true },
            _count: { id: true },
            orderBy: { earnedAt: "desc" },
        });

        // On récupère les détails des scores pour chaque date
        const scoresByDate: Record<string, any[]> = {};

        for (const group of scoresGrouped) {
            const date = group.earnedAt.toISOString().split("T")[0];
            const scores = await prisma.score.findMany({
                where: {
                    userId: user.id,
                    earnedAt: {
                        gte: new Date(date + "T00:00:00.000Z"),
                        lte: new Date(date + "T23:59:59.999Z"),
                    },
                },
            });
            scoresByDate[date] = scores.map(
                (s: {
                    id: any;
                    points: any;
                    reason: any;
                    day: any;
                    earnedAt: any;
                }) => ({
                    id: s.id,
                    points: s.points,
                    reason: s.reason,
                    day: s.day,
                    earnedAt: s.earnedAt,
                })
            );
        }

        return { score: user.score, scoresByDate };
    }

    async getLeaderboard(request: Request, response: Response) {
        const leaderboard = await prisma.user.findMany({
            orderBy: { score: "desc" },
            select: { username: true, score: true },
        });

        return leaderboard;
    }
}
