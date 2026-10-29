import { TvMoviesController } from "../controllers/tvMovies.controller";

export const TvMoviesRoutes = [
    {
        method: "get",
        route: "/tv-movies",
        controller: TvMoviesController,
        action: "getTvMovies",
    },
];
