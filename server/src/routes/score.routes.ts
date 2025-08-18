import { ScoreController } from "../controllers/score.controller";

export const ScoreRoutes = [
    {
        method: "post",
        route: "/scores",
        controller: ScoreController,
        action: "awardPoints",
    },
    {
        method: "get",
        route: "/scores/user/:uuid",
        controller: ScoreController,
        action: "getUserScore",
    },
];
