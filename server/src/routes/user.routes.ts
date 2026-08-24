import { UserController } from "../controllers/user.controller";

export const UserRoutes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "getUsers",
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "saveUser",
    },
    {
        method: "get",
        route: "/users/search",
        controller: UserController,
        action: "searchUsers",
    },
    {
        method: "get",
        route: "/users/:uuid",
        controller: UserController,
        action: "getUser",
    },
    {
        method: "delete",
        route: "/users/:uuid",
        controller: UserController,
        action: "removeUser",
    },
    {
        method: "post",
        route: "/users/:uuid/push-token",
        controller: UserController,
        action: "savePushToken",
    },
];
