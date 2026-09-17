import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { isPremiumEntitlementActive } from "../services/revenuecat.service";

export class RevenueCatController {
    // POST /webhooks/revenuecat
    // RevenueCat sends back the Authorization header value configured in the dashboard
    // (Project settings > Integrations > Webhooks) on every call.
    // See https://www.revenuecat.com/docs/integrations/webhooks.
    async handleWebhook(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const authHeader = request.headers.authorization;
        if (
            !process.env.REVENUECAT_WEBHOOK_SECRET ||
            authHeader !== `Bearer ${process.env.REVENUECAT_WEBHOOK_SECRET}`
        ) {
            return { status: 401, message: "Unauthorized" };
        }

        const event = request.body?.event ?? {};

        // app_user_id is always our own User.uuid (see PremiumContext.tsx,
        // which configures RevenueCat with appUserID: userUuid).
        // A TRANSFER event additionally carries transferred_from/transferred_to
        // when a restore reattaches a Play Store purchase to a new uuid after a reinstall.
        // Both ends need their premium status re-synced.
        const appUserIds = new Set(
            [
                event.app_user_id,
                ...(event.transferred_from ?? []),
                ...(event.transferred_to ?? []),
            ].filter((id: unknown): id is string => typeof id === "string"),
        );

        for (const uuid of appUserIds) {
            const user = await prisma.user.findUnique({ where: { uuid } });
            if (!user) continue;

            const isPremium = await isPremiumEntitlementActive(uuid);
            await prisma.user.update({
                where: { uuid },
                data: {
                    isPremium,
                    premiumSince: isPremium
                        ? (user.premiumSince ?? new Date())
                        : null,
                },
            });
        }

        return { status: 200, received: true };
    }
}
