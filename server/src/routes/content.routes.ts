import { ContentController } from "../controllers/content.controller";

export const ContentRoutes = [
    {
        method: "get",
        route: "/content/contents",
        controller: ContentController,
        action: "getContents",
    },
];
