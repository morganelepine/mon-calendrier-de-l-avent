import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { apiFetch } from "@/services/apiFetch";
import {
    isChristmasSeason,
    todayIsoDate,
    tomorrowIsoDate,
} from "@/constants/Dates";
import { StorageKeys } from "@/constants/storageKeys";
import { TvMovie } from "@/interfaces/tvMovieInterface";
import { getMockTvMovies } from "@/services/activities/tvMovies.mock";

// DEBUG: serve fake movies (one on air) to test the activities page on any date.
const DEBUG_MOCK_TV_MOVIES = false;

// Christmas TV movies air in November and December.
export const isTvMoviesSeason = isChristmasSeason;

interface CachedTvMovies {
    date: string;
    movies: TvMovie[];
}

// Today's schedule from the last successful fetch, or null.
export const getCachedTodayTvMovies = async (): Promise<TvMovie[] | null> => {
    try {
        const raw = await AsyncStorage.getItem(StorageKeys.tvMoviesCache);
        if (!raw) return null;
        const cached = JSON.parse(raw) as CachedTvMovies;
        return cached.date === todayIsoDate ? cached.movies : null;
    } catch {
        return null;
    }
};

// Fetched once per session and per date: shared by the activities hub and
// the schedule screen. Cleared on failure so the next call retries.
const tvMoviesPromises = new Map<string, Promise<TvMovie[]>>();

const getTvMovies = (date: string): Promise<TvMovie[]> => {
    if (DEBUG_MOCK_TV_MOVIES) return Promise.resolve(getMockTvMovies());

    let promise = tvMoviesPromises.get(date);
    if (!promise) {
        promise = apiFetch<{ movies: TvMovie[] }>(`/tv-movies?date=${date}`)
            .then(({ movies }) => {
                // Fire-and-forget: shown instantly on the next launches today.
                if (date === todayIsoDate) {
                    const cached: CachedTvMovies = { date, movies };
                    AsyncStorage.setItem(
                        StorageKeys.tvMoviesCache,
                        JSON.stringify(cached),
                    ).catch(() => {});
                }
                // So thumbnails show with the text instead of after it.
                void Image.prefetch(
                    movies.flatMap((movie) =>
                        movie.image ? [movie.image] : [],
                    ),
                    "memory-disk",
                );
                return movies;
            })
            .catch((error) => {
                tvMoviesPromises.delete(date);
                throw error;
            });
        tvMoviesPromises.set(date, promise);
    }
    return promise;
};

export const getTodayTvMovies = (): Promise<TvMovie[]> =>
    getTvMovies(todayIsoDate).catch(async (error) => {
        // Offline or API down: today's schedule from an earlier launch.
        const cached = await getCachedTodayTvMovies();
        if (cached) return cached;
        throw error;
    });

// Only once today's movies are over: not prefetched nor cached.
export const getTomorrowTvMovies = (): Promise<TvMovie[]> =>
    getTvMovies(tomorrowIsoDate);

// Called at app launch so the schedule is usually there by the time the activities page opens.
export const prefetchTvMovies = (): void => {
    if (!isTvMoviesSeason) return;
    getTodayTvMovies().catch(() => {});
};
