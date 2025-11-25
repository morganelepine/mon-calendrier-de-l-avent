import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

export class ClientLogController {
    async saveClientLog(request: Request) {
        const { message, data, uuid, appVersion } = request.body;

        try {
            const log = await prisma.clientLog.create({
                data: {
                    message,
                    data,
                    appVersion,
                    uuid,
                },
            });

            return {
                status: 200,
                data: log,
            };
        } catch (err) {
            return {
                status: 500,
                error: "Database error",
            };
        }
    }
}
