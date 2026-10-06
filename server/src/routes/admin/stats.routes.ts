import { AdminStatsController } from "../../controllers/admin/stats.controller";

export const AdminStatsRoutes = [
    {
        method: "get",
        route: "/admin/stats",
        controller: AdminStatsController,
        action: "get",
    },
];
