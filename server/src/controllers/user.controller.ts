import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { usernames } from "../data/usernames";

const prisma = new PrismaClient();

export class UserController {
    // GET /users
    async getAll(request: Request, response: Response, next: NextFunction) {
        const users = await prisma.user.findMany();
        return users;
    }

    // GET /users/:uuid
    async getOne(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.uuid;
        const user = await prisma.user.findUnique({
            where: { uuid },
        });

        if (!user) {
            return { status: 404, message: "Unregistered user" };
        }

        return user;
    }

    // POST /users
    async save(request: Request, response: Response, next: NextFunction) {
        const { uuid, score } = request.body;

        const usedUsers = await prisma.user.findMany({
            select: { username: true }
        });
        const usedUsernames = usedUsers.map(u => u.username);
        console.log(usedUsernames);

        const availableUsernames = usernames.filter(name => !usedUsernames.includes(name));
        console.log(availableUsernames);

        if (availableUsernames.length === 0) {
            return { status: 404, message: "No username available" };
        }

        const randomIndex = Math.floor(Math.random() * availableUsernames.length);
        const username = availableUsernames[randomIndex];
        console.log(username);

        const user = await prisma.user.create({
            data: { uuid, username, score },
        });

        return user;
    }

    // DELETE /users/:uuid
    async remove(request: Request, response: Response, next: NextFunction) {
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
