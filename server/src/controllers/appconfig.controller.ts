import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export class AppConfigController {
    // GET /version
    async getVersion(request: Request, response: Response, next: NextFunction) {
        const requirement = await prisma.appVersionRequirement.findUnique({
            where: { id: 1 },
        });

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
            // Still read by app versions released before latest_version existed.
            min_required_version: requirement.minSupportedVersion,
        };
    }
}
