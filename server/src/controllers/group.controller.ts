import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

export class GroupController {
    async createGroup(request: Request) {
        const { ownerId } = request.body;

        const group = await prisma.group.create({
            data: {
                name: "Mon groupe",
                ownerId: Number(ownerId),
            },
        });

        await prisma.groupMember.create({
            data: {
                groupId: group.id,
                userId: Number(ownerId),
            },
        });

        return group;
    }

    // A member's score is this season's only (see ScoreController for why
    // it's never stored) - group ranking can't be a plain Prisma orderBy on
    // a column anymore, so members are fetched as-is and re-sorted in JS
    // once each one's current-year total has been computed.
    async getGroup(request: Request) {
        const { userId } = request.params;
        const currentYear = new Date().getFullYear();

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

        if (!group) return group;

        const totals = await prisma.score.groupBy({
            by: ["userId"],
            where: {
                year: currentYear,
                userId: { in: group.members.map((member) => member.userId) },
            },
            _sum: { points: true },
        });
        const scoreByUserId = new Map(
            totals.map((total) => [total.userId, total._sum.points ?? 0]),
        );

        const members = group.members
            .map((member) => ({
                ...member,
                user: {
                    ...member.user,
                    score: scoreByUserId.get(member.userId) ?? 0,
                },
            }))
            .sort((a, b) => b.user.score - a.user.score);

        return { ...group, members };
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
}
