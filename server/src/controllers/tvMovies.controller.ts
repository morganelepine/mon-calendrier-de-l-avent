import { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";
import { getTvMoviesByDate, TvMovie } from "../services/tvMovies.service";

export class TvMoviesController {
    // GET /tv-movies?date=yyyy-mm-dd
    // The client sends its own "today" so the CDN cache key changes at
    // midnight (and DEBUG_FAKE_TODAY works).
    async getTvMovies(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const date = request.query.date;
        if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return { status: 400, error: "Invalid date" };
        }
        const [year, month, day] = date.split("-");

        let movies: TvMovie[];
        let maxAge: number;
        try {
            movies = await getTvMoviesByDate(`${day}/${month}/${year}`);
            maxAge = 3600;
        } catch (error) {
            // The upstream API also fails when it has nothing to show (off season):
            // degrade to "no movies today" rather than an error the app would report on each visit.
            // Cached briefly so the upstream isn't hit by every user while it's down.
            Sentry.captureException(error);
            movies = [];
            maxAge = 600;
        }

        response.setHeader(
            "Cache-Control",
            `public, s-maxage=${maxAge}, stale-while-revalidate=86400`,
        );

        return { status: 200, movies };
    }
}
