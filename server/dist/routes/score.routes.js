"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreRoutes = void 0;
const score_controller_1 = require("../controllers/score.controller");
exports.ScoreRoutes = [
    {
        method: "post",
        route: "/scores",
        controller: score_controller_1.ScoreController,
        action: "saveScore",
    },
    {
        method: "get",
        route: "/scores/user/:uuid",
        controller: score_controller_1.ScoreController,
        action: "getUserScoresByDay",
    },
    {
        method: "get",
        route: "/scores/total/user/:uuid",
        controller: score_controller_1.ScoreController,
        action: "getUserTotalScore",
    },
    {
        method: "get",
        route: "/scores/leaderboard",
        controller: score_controller_1.ScoreController,
        action: "getLeaderboard",
    },
    {
        method: "get",
        route: "/scores/user/:uuid/:day/open",
        controller: score_controller_1.ScoreController,
        action: "isDayOpen",
    },
];
//# sourceMappingURL=score.routes.js.map