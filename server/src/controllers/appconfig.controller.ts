import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export class AppConfigController {
    // GET /version
    async getVersion(request: Request, response: Response, next: NextFunction) {
        const [requirement, announcements] = await Promise.all([
            prisma.appVersionRequirement.findUnique({ where: { id: 1 } }),
            // Start date is checked client-side so the test screen's fake date applies.
            prisma.announcement.findMany({
                where: { endDate: { gt: new Date() } },
                orderBy: { startDate: "asc" },
                select: {
                    id: true,
                    title: true,
                    message: true,
                    buttonLabel: true,
                    url: true,
                    startDate: true,
                    endDate: true,
                },
            }),
        ]);

        if (!requirement) {
            return {
                status: 404,
                message: "Undefined version requirement",
            };
        }

        return {
            status: 200,
            min_supported_version: requirement.minSupportedVersion,
            latest_version: requirement.latestVersion,
            update_message: requirement.updateMessage,
            announcements,
            // Still read by app versions released before latest_version existed.
            min_required_version: requirement.minSupportedVersion,
        };
    }
}
