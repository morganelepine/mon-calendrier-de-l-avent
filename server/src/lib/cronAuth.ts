import { Request } from "express";

// Vercel automatically sends `Authorization: Bearer $CRON_SECRET` on its own invocations,
// see https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
export function isCronRequest(request: Request): boolean {
    return (
        !!process.env.CRON_SECRET &&
        request.headers.authorization === `Bearer ${process.env.CRON_SECRET}`
    );
}
