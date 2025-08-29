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
            return "Unregistered user";
        }
        return user;
    }

    // POST /users
    async save(request: Request, response: Response, next: NextFunction) {
        const { uuid, score } = request.body;
        let username;

        if (usernames.length === 0) {
            username = "username";
        }

        const randomIndex = Math.floor(Math.random() * usernames.length);
        username = usernames[randomIndex];
        usernames.splice(randomIndex, 1);

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
