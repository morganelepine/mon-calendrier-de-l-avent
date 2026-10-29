import { useEffect, useState } from "react";
import { isOctober } from "@/constants/Dates";
import { getTodayTvMovies } from "@/services/tvMovies.service";
import { TvMovie } from "@/interfaces/tvMovieInterface";

interface TodayTvMovies {
    movies: TvMovie[] | null; // null while loading
    error: boolean;
}

export const useTodayTvMovies = (): TodayTvMovies => {
    const [movies, setMovies] = useState<TvMovie[] | null>(
        // Hidden during the Halloween season, even if some are on air.
        isOctober ? [] : null,
    );
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isOctober) return undefined;
        let cancelled = false;
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
