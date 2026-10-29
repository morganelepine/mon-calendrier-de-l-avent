import { RetrospectiveController } from "../controllers/retrospective.controller";

export const RetrospectiveRoutes = [
    {
        // Vercel Cron Jobs only trigger via HTTP GET.
        // Declared before /:uuid so "compute" isn't read as a uuid.
        method: "get",
        route: "/retrospective/compute",
        controller: RetrospectiveController,
        action: "compute",
    },
    {
        method: "get",
        route: "/retrospective/:uuid",
        controller: RetrospectiveController,
        action: "getUserRetrospective",
    },
];
