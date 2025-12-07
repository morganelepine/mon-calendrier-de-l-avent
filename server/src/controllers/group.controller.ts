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

    async getGroup(request: Request) {
        const { userId } = request.params;

        const group = await prisma.group.findFirst({
            where: { ownerId: Number(userId) },
            include: {
                members: {
                    orderBy: {
                        user: {
                            score: "desc",
                        },
                    },
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
}
