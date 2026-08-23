import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export class AppConfigController {
    // GET /version
    async getVersion(request: Request, response: Response, next: NextFunction) {
        const config = await prisma.appConfig.findUnique({
            where: { key: "min_required_version" },
        });

        if (!config) {
            return {
                status: 400,
                message: "Undefined min version",
            };
        }

        return {
            status: 200,
            min_required_version: config.value,
        };
    }
}
