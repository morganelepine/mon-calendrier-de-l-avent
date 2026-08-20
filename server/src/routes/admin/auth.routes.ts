import { AdminAuthController } from "../../controllers/admin/auth.controller";

// Deliberately outside the /admin prefix so a single
// app.use("/admin", requireAdminAuth) can guard everything else without an
// exclusion list.
export const AdminAuthRoutes = [
    {
        method: "post",
        route: "/admin-auth/login",
        controller: AdminAuthController,
        action: "login",
    },
    {
        method: "post",
        route: "/admin-auth/logout",
        controller: AdminAuthController,
        action: "logout",
    },
    {
        method: "get",
        route: "/admin-auth/me",
        controller: AdminAuthController,
        action: "me",
    },
];
