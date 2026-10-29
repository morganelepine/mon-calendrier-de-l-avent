import { apiFetch } from "@/services/apiFetch";
import { todayIsoDate } from "@/constants/Dates";
import { TvMovie } from "@/interfaces/tvMovieInterface";
import { getMockTvMovies } from "@/services/tvMovies.mock";

// DEBUG: serve fake movies (one on air) to test the activities page on any date.
const DEBUG_MOCK_TV_MOVIES = false;

// Fetched once per session: shared by the activities hub (to know whether
// to show the card) and the schedule screen. Cleared on failure so the
// next call retries.
let tvMoviesPromise: Promise<TvMovie[]> | null = null;

export const getTodayTvMovies = (): Promise<TvMovie[]> => {
    if (DEBUG_MOCK_TV_MOVIES) return Promise.resolve(getMockTvMovies());

    tvMoviesPromise ??= apiFetch<{ movies: TvMovie[] }>(
        `/tv-movies?date=${todayIsoDate}`,
    )
        .then((data) => data.movies)
        .catch((error) => {
            tvMoviesPromise = null;
            throw error;
        });
    return tvMoviesPromise;
};
