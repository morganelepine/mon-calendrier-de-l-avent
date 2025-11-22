import { AppConfigController } from "../controllers/appconfig.controller";

export const AppConfigRoutes = [
    {
        method: "get",
        route: "/version",
        controller: AppConfigController,
        action: "getVersion",
    },
];
