import { ClientLogController } from "../controllers/clientLog.controller";

export const ClientLogRoutes = [
    {
        method: "post",
        route: "/client-log",
        controller: ClientLogController,
        action: "saveClientLog",
    },
];
