import { ScoreController } from "../controllers/score.controller";

export const ScoreRoutes = [
    {
        method: "post",
        route: "/scores",
        controller: ScoreController,
        action: "saveScore",
    },
    {
        method: "post",
        route: "/scores/check-in",
        controller: ScoreController,
        action: "checkIn",
    },
    {
        method: "post",
        route: "/scores/check-in/joker",
        controller: ScoreController,
        action: "useCheckInJoker",
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
        route: "/scores/leaderboard/around/:uuid",
        controller: ScoreController,
        action: "getLeaderboardAround",
    },
];
