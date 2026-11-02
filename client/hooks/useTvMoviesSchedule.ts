import { useEffect, useState } from "react";
import {
    getCachedTodayTvMovies,
    getTodayTvMovies,
    getTomorrowTvMovies,
    isTvMoviesSeason,
} from "@/services/activities/tvMovies.service";
import { useCurrentMinutes } from "@/hooks/useCurrentMinutes";
import { TvMovie } from "@/interfaces/tvMovieInterface";
import { toMinutes } from "@/utils/hours";

export type TvMoviesDay = "today" | "tomorrow";

interface TvMoviesSchedule {
    // Tomorrow's schedule once today's movies are all over (or none today).
    day: TvMoviesDay;
    movies: TvMovie[] | null; // null while loading
    error: boolean;
}

export const useTvMoviesSchedule = (): TvMoviesSchedule => {
    const [today, setToday] = useState<TvMovie[] | null>(
        isTvMoviesSeason ? null : [],
    );
    const [tomorrow, setTomorrow] = useState<TvMovie[] | null>(null);
    const [error, setError] = useState(false);
    const nowMinutes = useCurrentMinutes();

    useEffect(() => {
        if (!isTvMoviesSeason) return undefined;
        let cancelled = false;

        // Today's cached schedule first, for an instant render;
        // never over fresher data if the network answered first.
        getCachedTodayTvMovies().then((cached) => {
            if (!cancelled && cached) {
                setToday((current) => current ?? cached);
            }
        });

        getTodayTvMovies()
            .then((result) => {
                if (!cancelled) setToday(result);
            })
            .catch(() => {
                if (!cancelled) setError(true);
            });

        return (): void => {
            cancelled = true;
        };
    }, []);

    const isTodayOver =
        isTvMoviesSeason &&
        today !== null &&
        today.every((movie) => toMinutes(movie.endHour) <= nowMinutes);

    useEffect(() => {
        if (!isTodayOver) return undefined;
        let cancelled = false;
        getTomorrowTvMovies()
            .then((result) => {
                if (!cancelled) setTomorrow(result);
            })
            // A preview only: no schedule rather than an error.
            .catch(() => {
                if (!cancelled) setTomorrow([]);
            });
        return (): void => {
            cancelled = true;
        };
    }, [isTodayOver]);

    return isTodayOver
        ? { day: "tomorrow", movies: tomorrow, error: false }
        : { day: "today", movies: today, error };
};
