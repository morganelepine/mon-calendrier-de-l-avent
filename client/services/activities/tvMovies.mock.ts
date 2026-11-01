import { getNow } from "@/constants/Dates";
import { TvMovie } from "@/interfaces/tvMovieInterface";
import { toHour } from "@/utils/hours";

// Built around the current time (getNow, so DEBUG_FAKE_TODAY included):
// the first movie is always on air, the next ones follow.
const MOCK_MOVIES: Omit<TvMovie, "startHour" | "endHour">[] = [
    {
        title: "Un Noël magique à Rome",
        description:
            "Une Américaine, guide touristique à Rome, accepte d'enseigner l'esprit de Noël à un riche homme d'affaires dans cette ville qu'elle apprécie tant.",
        image: "https://images.voomotion.be/Events/2025/11/24/55/2618491_A.jpg",
        channel: "TMC",
    },
    {
        title: "Noël sous les aurores boréales",
        description:
            "Deux journalistes de voyage, une femme et un homme qui se battent pour le poste de rédacteur en chef, finissent par se rapprocher suite à un événement inattendu.",
        image: "https://images.voomotion.be/Events/2026/10/16/51/2647471_A.jpg",
        channel: "TF1 Séries Films",
    },
    {
        title: "Où est passé Noël ?",
        description:
            "Pour stimuler l'esprit des fêtes, deux lutins proposent au Père Noël d'accorder trois voeux à un humain ; la chanceuse sera Erin, qui hélas, déteste Noël.",
        image: "https://images.voomotion.be/Events/2026/10/16/34/2653002_A.jpg",
        channel: "TF1",
    },
];

const MOVIE_DURATION = 90;
export const getMockTvMovies = (): TvMovie[] => {
    const now = new Date(getNow());
    // Started 30 min ago (1/3 of the progress bar), but never before
    // midnight: a start at 23h43 would be tonight, not on air.
    const firstStart = Math.max(
        0,
        now.getHours() * 60 + now.getMinutes() - 30,
    );

    return MOCK_MOVIES.map((movie, index) => {
        const start = firstStart + index * MOVIE_DURATION;
        return {
            ...movie,
            startHour: toHour(start),
            endHour: toHour(start + MOVIE_DURATION),
        };
    });
};
