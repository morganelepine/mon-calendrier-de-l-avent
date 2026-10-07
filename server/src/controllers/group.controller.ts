import { Request } from "express";
import { prisma } from "../lib/prisma";

export class GroupController {
    // The group is only created once the owner adds their first members
    // Idempotent: if the owner already has a group (double tap, retry after a lost response),
    // the members are added to it instead.
    async createGroup(request: Request) {
        const ownerId = Number(request.body.ownerId);
        const memberIds: number[] = Array.isArray(request.body.memberIds)
            ? request.body.memberIds.map(Number)
            : [];

        if (memberIds.length === 0) {
            return { status: 400, message: "memberIds is required" };
        }

        const userIds = [...new Set([ownerId, ...memberIds])];

        const existing = await prisma.group.findFirst({ where: { ownerId } });
        if (existing) {
            await prisma.groupMember.createMany({
                data: userIds.map((userId) => ({
                    groupId: existing.id,
                    userId,
                })),
                skipDuplicates: true,
            });
            return existing;
        }

        return prisma.group.create({
            data: {
                name: "Mon groupe",
                ownerId,
                members: {
                    create: userIds.map((userId) => ({ userId })),
                },
            },
        });
    }

    async getGroup(request: Request) {
        const { userId } = request.params;
        const currentYear = new Date().getFullYear();

        const group = await prisma.group.findFirst({
            where: { ownerId: Number(userId) },
            include: {
                members: {
                    include: {
                        user: { select: { id: true, username: true } },
                    },
                },
            },
        });

        if (!group) return group;

        const totals = await prisma.userYearScore.findMany({
            where: {
                year: currentYear,
                userId: { in: group.members.map((member) => member.userId) },
            },
            select: { userId: true, total: true },
        });
        const scoreByUserId = new Map(
            totals.map((total) => [total.userId, total.total]),
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
