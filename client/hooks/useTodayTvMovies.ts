import { useEffect, useState } from "react";
import {
    getCachedTodayTvMovies,
    getTodayTvMovies,
    isTvMoviesSeason,
} from "@/services/activities/tvMovies.service";
import { TvMovie } from "@/interfaces/tvMovieInterface";

interface TodayTvMovies {
    movies: TvMovie[] | null; // null while loading
    error: boolean;
}

export const useTodayTvMovies = (): TodayTvMovies => {
    const [movies, setMovies] = useState<TvMovie[] | null>(
        isTvMoviesSeason ? null : [],
    );
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!isTvMoviesSeason) return undefined;
        let cancelled = false;

        // Today's cached schedule first, for an instant render;
        // never over fresher data if the network answered first.
        getCachedTodayTvMovies().then((cached) => {
            if (!cancelled && cached) {
                setMovies((current) => current ?? cached);
            }
        });

        getTodayTvMovies()
            .then((result) => {
                if (!cancelled) setMovies(result);
            })
            .catch(() => {
                if (!cancelled) setError(true);
            });

        return (): void => {
            cancelled = true;
        };
    }, []);

    return { movies, error };
};
