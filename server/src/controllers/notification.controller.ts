import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { sendExpoPushNotifications } from "../services/expoPush.service";

function getParisNow(): Date {
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }),
    );
}

function isWithinCalendarWindow(parisNow: Date): boolean {
    return (
        parisNow.getMonth() === 11 && // December
        parisNow.getDate() >= 1 &&
        parisNow.getDate() <= 25
    );
}

function buildReminderTitle(parisNow: Date): string {
    const daysLeft = 25 - parisNow.getDate();
    if (daysLeft === 0) return "Joyeux Noël ✨";
    return `✨ J-${daysLeft} avant Noël`;
}

export class NotificationController {
    // GET /notifications/send-daily-reminder
    // Triggered by the Vercel Cron job every morning in December.
    // Vercel automatically sends `Authorization: Bearer $CRON_SECRET` on its own invocations,
    // which is what's checked below - see https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
    async sendDailyReminder(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const authHeader = request.headers.authorization;
        if (
            !process.env.CRON_SECRET ||
            authHeader !== `Bearer ${process.env.CRON_SECRET}`
        ) {
            return { status: 401, message: "Unauthorized" };
        }

        const parisNow = getParisNow();

        // ?force=true bypasses the date window for manual testing outside December.
        // Still requires the cron secret above, so it's not publicly triggerable.
        const isForced = request.query.force === "true";
        if (!isForced && !isWithinCalendarWindow(parisNow)) {
            return { status: 200, message: "Outside calendar window, skipped" };
        }

        const users = await prisma.user.findMany({
            where: { pushToken: { not: null } },
            select: { pushToken: true },
        });

        if (users.length === 0) {
            return { status: 200, sent: 0 };
        }

        const title = buildReminderTitle(parisNow);
        const results = await sendExpoPushNotifications(
            users.map((user) => ({
                to: user.pushToken as string,
                title,
                body: "Ouvre la case du calendrier avant que les lutins ne s'impatientent 🎄",
            })),
        );

        const tokensToForget = results
            .filter((result) => result.shouldForgetToken)
            .map((result) => result.token);

        if (tokensToForget.length > 0) {
            await prisma.user.updateMany({
                where: { pushToken: { in: tokensToForget } },
                data: { pushToken: null },
            });
        }

        return {
            status: 200,
            sent: results.filter((result) => result.ok).length,
            forgotten: tokensToForget.length,
        };
    }
}
