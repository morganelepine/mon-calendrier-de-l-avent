import { GroupController } from "../controllers/group.controller";

export const GroupRoutes = [
    {
        method: "post",
        route: "/groups",
        controller: GroupController,
        action: "createGroup",
    },
    {
        method: "get",
        route: "/groups/:userId",
        controller: GroupController,
        action: "getGroup",
    },
    {
        method: "post",
        route: "/groups/:groupId/members",
        controller: GroupController,
        action: "addMember",
    },
    {
        method: "delete",
        route: "/groups/:groupId/members",
        controller: GroupController,
        action: "removeMember",
    },
];
