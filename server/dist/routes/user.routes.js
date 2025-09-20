"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
exports.UserRoutes = [
    {
        method: "get",
        route: "/users",
        controller: user_controller_1.UserController,
        action: "getAll",
    },
    {
        method: "get",
        route: "/users/:uuid",
        controller: user_controller_1.UserController,
        action: "getOne",
    },
    {
        method: "post",
        route: "/users",
        controller: user_controller_1.UserController,
        action: "save",
    },
    {
        method: "delete",
        route: "/users/:uuid",
        controller: user_controller_1.UserController,
        action: "remove",
    },
];
//# sourceMappingURL=user.routes.js.map