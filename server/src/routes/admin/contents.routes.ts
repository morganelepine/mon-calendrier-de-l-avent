import { AdminContentsController } from "../../controllers/admin/contents.controller";

export const AdminContentsRoutes = [
    {
        method: "get",
        route: "/admin/contents",
        controller: AdminContentsController,
        action: "list",
    },
    {
        method: "get",
        route: "/admin/contents/:id",
        controller: AdminContentsController,
        action: "get",
    },
    {
        method: "post",
        route: "/admin/contents",
        controller: AdminContentsController,
        action: "create",
    },
    {
        method: "put",
        route: "/admin/contents/:id",
        controller: AdminContentsController,
        action: "update",
    },
    {
        method: "delete",
        route: "/admin/contents/:id",
        controller: AdminContentsController,
        action: "remove",
    },
];
