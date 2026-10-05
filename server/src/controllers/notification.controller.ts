import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { sendExpoPushNotifications } from "../services/expoPush.service";

type Season = "halloween" | "christmas";

function getParisNow(): Date {
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }),
    );
}

function getActiveSeason(parisNow: Date): Season | null {
    const month = parisNow.getMonth();
    if (month === 9) return "halloween"; // October
    if (month === 11 && parisNow.getDate() <= 25) return "christmas"; // December 1-25
    return null;
}

function getDayOpeningReason(season: Season): string {
    return season === "halloween" ? "OctoberOpening" : "DayOpening";
}

function buildReminderContent(
    season: Season,
    parisNow: Date,
): { title: string; body: string } {
    if (season === "halloween") {
        return {
            title:
                parisNow.getDate() === 31
                    ? "🎃 Happy Halloween"
                    : "🍂 Le calendrier vous attend",
            body: "Ouvrez la case du jour avant que les fantômes ne s'impatientent 👻",
        };
    }

    const daysLeft = 25 - parisNow.getDate();
    return {
        title:
            daysLeft === 0 ? "Joyeux Noël ✨" : `✨ J-${daysLeft} avant Noël`,
        body: "Ouvrez la case du calendrier avant que les lutins ne s'impatientent 🎄",
    };
}

export class NotificationController {
    // GET /notifications/send-daily-reminder
    // Triggered by the Vercel Cron job every morning in October
    // and in December (see server/vercel.json - two schedules, same endpoint).
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

        // ?force=true bypasses the date window for manual testing outside October/December.
        // Optionally pair with ?season=halloween|christmas to pick which copy to test (defaults to christmas).
        // Still requires the cron secret above, so it's not publicly triggerable.
        const isForced = request.query.force === "true";
        const forcedSeason: Season =
            request.query.season === "halloween" ? "halloween" : "christmas";

        const season =
            getActiveSeason(parisNow) ?? (isForced ? forcedSeason : null);
        if (!season) {
            return { status: 200, message: "Outside calendar window, skipped" };
        }

        const users = await prisma.user.findMany({
            where: { pushToken: { not: null } },
            select: { id: true, pushToken: true },
        });

        if (users.length === 0) {
            return { status: 200, sent: 0 };
        }

        // Skip anyone who already opened today's door.
        // ?ignoreOpened=true bypasses this for testing.
        const ignoreOpened = request.query.ignoreOpened === "true";
        let usersToNotify = users;
        if (!ignoreOpened) {
            const alreadyOpened = await prisma.score.findMany({
                where: {
                    year: parisNow.getFullYear(),
                    day: parisNow.getDate(),
                    reason: getDayOpeningReason(season),
                    userId: { in: users.map((user) => user.id) },
                },
                select: { userId: true },
            });
            const alreadyOpenedIds = new Set(
                alreadyOpened.map((score) => score.userId),
            );
            usersToNotify = users.filter(
                (user) => !alreadyOpenedIds.has(user.id),
            );
        }

        if (usersToNotify.length === 0) {
            return {
                status: 200,
                season,
                sent: 0,
                skippedAlreadyOpened: users.length,
            };
        }

        const { title, body } = buildReminderContent(season, parisNow);
        const results = await sendExpoPushNotifications(
            usersToNotify.map((user) => ({
                to: user.pushToken as string,
                title,
                body,
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
            season,
            sent: results.filter((result) => result.ok).length,
            forgotten: tokensToForget.length,
            skippedAlreadyOpened: users.length - usersToNotify.length,
        };
    }
}
