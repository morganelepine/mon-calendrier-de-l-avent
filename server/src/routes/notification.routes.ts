import { NotificationController } from "../controllers/notification.controller";

export const NotificationRoutes = [
    {
        // Vercel Cron Jobs only trigger via HTTP GET.
        method: "get",
        route: "/notifications/send-daily-reminder",
        controller: NotificationController,
        action: "sendDailyReminder",
    },
];
