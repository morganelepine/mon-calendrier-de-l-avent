import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { usernames } from "../data/usernames";

const prisma = new PrismaClient();

export class UserController {
    // GET /users
    async getUsers(request: Request, response: Response, next: NextFunction) {
        const users = await prisma.user.findMany();
        return users;
    }

    // GET /users/:uuid
    async getUser(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.uuid;
        const user = await prisma.user.findUnique({
            where: { uuid },
        });

        if (!user) {
            return { status: 404, message: "Unregistered user" };
        }

        return user;
    }

    // GET /users/search/:query
    async searchUsers(request: Request) {
        const { query, groupId } = request.query;

        if (typeof query !== "string" || !groupId) {
            return [];
        }

        const group = await prisma.group.findUnique({
            where: { id: Number(groupId) },
            include: { members: true },
        });

        if (!group) return [];

        const excludedIds = group.members.map((member) => member.userId);

        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: query,
                    mode: "insensitive",
                },
                id: {
                    notIn: excludedIds,
                },
            },
        });

        return users;
    }

    // POST /users
    async saveUser(request: Request, response: Response, next: NextFunction) {
        const { uuid, score } = request.body;

        const usedUsers = await prisma.user.findMany({
            select: { username: true },
        });
        const usedUsernames = new Set(usedUsers.map((u) => u.username));

        const availableUsernames = usernames.filter(
            (name) => !usedUsernames.has(name)
        );

        if (availableUsernames.length === 0) {
            return { status: 404, message: "No username available" };
        }

        const randomIndex = Math.floor(
            Math.random() * availableUsernames.length
        );
        const username = availableUsernames[randomIndex];

        const user = await prisma.user.create({
            data: { uuid, username, score },
        });

        return user;
    }

    // DELETE /users/:uuid
    async removeUser(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.uuid;

        const user = await prisma.user.findUnique({
            where: { uuid },
        });

        if (!user) {
            return "This user does not exist";
        }

        await prisma.user.delete({
            where: { uuid },
        });

        return "User has been removed";
    }
}
