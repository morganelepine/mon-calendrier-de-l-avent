import { AccessController } from "../controllers/access.controller";

export const AccessRoutes = [
    {
        method: "post",
        route: "/access/verify",
        controller: AccessController,
        action: "verify",
    },
];
