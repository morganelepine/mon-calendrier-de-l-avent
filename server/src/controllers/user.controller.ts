import { Request, Response, NextFunction } from "express";
import { usernames } from "../data/usernames";
import { prisma } from "../lib/prisma";

const FALLBACK_SEGMENTS = ["de_Noël", "du_Nord", "de_Minuit"];
const MAX_FALLBACK_ATTEMPTS = 200;

// Only used once the curated `usernames` pool is fully taken.
// First tries completing an existing name with one of a few curated segments (e.g. "Ange_Doré_de_Noël").
// If that tier is somehow exhausted too, falls back to a random numeric suffix
// as an ultimate safety net so sign-ups never hard-fail.
function generateFallbackUsername(usedUsernames: Set<string>): string {
    for (let attempt = 0; attempt < MAX_FALLBACK_ATTEMPTS; attempt++) {
        const base = usernames[Math.floor(Math.random() * usernames.length)];
        const segment =
            FALLBACK_SEGMENTS[
                Math.floor(Math.random() * FALLBACK_SEGMENTS.length)
            ];
        const username = `${base}_${segment}`;
        if (!usedUsernames.has(username)) return username;
    }

    // If we reach this point, the curated pool is completely exhausted.
    // We fall back to a random numeric suffix.
    let username: string;
    do {
        const base = usernames[Math.floor(Math.random() * usernames.length)];
        const suffix = Math.floor(Math.random() * 900) + 100;
        username = `${base}~${suffix}`;
    } while (usedUsernames.has(username));
    return username;
}

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
    // Get-or-create: idempotent on `uuid`. If an account already exists
    // for this uuid it's returned as-is (no error).
    // A lost response followed by a client retry lands here too and simply gets
    // the same account back rather than failing.
    async saveUser(request: Request, response: Response, next: NextFunction) {
        const { uuid } = request.body;

        const existingUser = await prisma.user.findUnique({ where: { uuid } });
        if (existingUser) return existingUser;

        const usedUsers = await prisma.user.findMany({
            select: { username: true },
        });
        const usedUsernames = new Set(usedUsers.map((u) => u.username));

        const availableUsernames = usernames.filter(
            (name) => !usedUsernames.has(name),
        );

        // The curated pool is finite. Normally there's plenty of room,
        // but if it ever runs dry we fall back to reusing a name with a random suffix
        // instead of blocking sign-ups with a 404.
        const username =
            availableUsernames.length > 0
                ? availableUsernames[
                      Math.floor(Math.random() * availableUsernames.length)
                  ]
                : generateFallbackUsername(usedUsernames);

        try {
            return await prisma.user.create({
                data: { uuid, username },
            });
        } catch (err: any) {
            // Two near-simultaneous requests for the same brand-new uuid
            // (e.g. a double tap) can both pass the findUnique check above
            // before either has inserted. Whichever loses the race just
            // falls back to reading the row the winner created.
            if (err?.code === "P2002") {
                const user = await prisma.user.findUnique({ where: { uuid } });
                if (user) return user;
            }
            throw err;
        }
    }

    // POST /users/:uuid/push-token
    // Registers (or clears, if pushToken is falsy) this user's Expo push token.
    // Called after the user accepts the notifications prompt.
    async savePushToken(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const uuid = request.params.uuid;
        const { pushToken } = request.body;

        const user = await prisma.user.findUnique({ where: { uuid } });
        if (!user) {
            return { status: 404, message: "Unregistered user" };
        }

        return await prisma.user.update({
            where: { uuid },
            data: { pushToken: pushToken || null },
        });
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
