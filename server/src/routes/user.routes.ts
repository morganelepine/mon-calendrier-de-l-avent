import { UserController } from "../controllers/user.controller";

export const UserRoutes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "getAll",
    },
    {
        method: "get",
        route: "/users/:uuid",
        controller: UserController,
        action: "getOne",
    },
    {
        method: "get",
        route: "/users/search/:query",
        controller: UserController,
        action: "searchUser",
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save",
    },
    {
        method: "delete",
        route: "/users/:uuid",
        controller: UserController,
        action: "remove",
    },
];
