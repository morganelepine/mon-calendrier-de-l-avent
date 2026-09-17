import { RevenueCatController } from "../controllers/revenuecat.controller";

export const RevenueCatRoutes = [
    {
        method: "post",
        route: "/webhooks/revenuecat",
        controller: RevenueCatController,
        action: "handleWebhook",
    },
];
