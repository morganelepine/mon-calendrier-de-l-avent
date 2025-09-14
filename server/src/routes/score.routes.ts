import { ScoreController } from "../controllers/score.controller";

export const ScoreRoutes = [
    {
        method: "post",
        route: "/scores",
        controller: ScoreController,
        action: "saveScore",
    },
    {
        method: "get",
        route: "/scores/user/:uuid",
        controller: ScoreController,
        action: "getUserScoresByDay",
    },
    {
        method: "get",
        route: "/scores/total/user/:uuid",
        controller: ScoreController,
        action: "getUserTotalScore",
    },
    {
        method: "get",
        route: "/scores/leaderboard",
        controller: ScoreController,
        action: "getLeaderboard",
    },
    {
        method: "get",
        route: "/scores/user/:uuid/:day/open",
        controller: ScoreController,
        action: "isDayOpen",
    },
];
