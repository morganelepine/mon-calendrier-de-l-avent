import { Games2048Controller } from "../controllers/games2048.controller";

export const Games2048Routes = [
    {
        method: "post",
        route: "/games/2048/score",
        controller: Games2048Controller,
        action: "submitScore",
    },
    {
        method: "get",
        route: "/games/2048/leaderboard",
        controller: Games2048Controller,
        action: "getLeaderboard",
    },
    {
        method: "get",
        route: "/games/2048/leaderboard/around/:uuid",
        controller: Games2048Controller,
        action: "getLeaderboardAround",
    },
    {
        method: "get",
        route: "/games/2048/stats/:uuid",
        controller: Games2048Controller,
        action: "getStats",
    },
];
