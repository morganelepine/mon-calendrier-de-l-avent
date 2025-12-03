import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

export class GroupController {
    async createGroup(request: Request) {
        const { name, ownerId } = request.body;

        const group = await prisma.group.create({
            data: {
                name,
                ownerId: Number(ownerId),
            },
        });

        return group;
    }

    async getGroup(request: Request) {
        const { userId } = request.params;

        const group = await prisma.group.findFirst({
            where: { ownerId: Number(userId) },
            include: {
                members: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return group;
    }

    async addMember(request: Request) {
        const { userId } = request.body;
        const { groupId } = request.params;

        const member = await prisma.groupMember.create({
            data: {
                groupId: Number(groupId),
                userId: Number(userId),
            },
        });

        return member;
    }

    async removeMember(request: Request) {
        const { userId } = request.body;
        const { groupId } = request.params;

        await prisma.groupMember.delete({
            where: {
                groupId_userId: {
                    groupId: Number(groupId),
                    userId: Number(userId),
                },
            },
        });

        return { success: true };
    }

    async showMembers(request: Request) {
        const { groupId } = request.params;

        const members = await prisma.groupMember.findMany({
            where: { groupId: Number(groupId) },
            include: {
                user: true,
            },
        });

        return members;
    }

    async getMembersLeaderboard(request: Request) {
        const { groupId } = request.params;

        const leaderboard = await prisma.groupMember.findMany({
            where: { groupId: Number(groupId) },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        score: true,
                    },
                },
            },
            orderBy: {
                user: {
                    score: "desc",
                },
            },
        });

        return leaderboard;
    }
}
