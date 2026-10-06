import { isOctober } from "@/constants/Dates";

export type MusicSeason = "december" | "october";

export interface Music {
    // Stable identifier stored in AsyncStorage - never rename it.
    id: string;
    title: string;
    url: string;
    season: MusicSeason;
    premium: boolean;
}

// Order matters: tracks play in this order, one per day, then loop.
export const MUSICS: Music[] = [
    {
        id: "silent-night",
        title: "Silent Night",
        url: "https://res.cloudinary.com/deauthz29/video/upload/v1730978205/silent-night_ff2gwk.mp3",
        season: "december",
        premium: false,
    },
    {
        id: "white-christmas",
        title: "White Christmas",
        url: "https://res.cloudinary.com/deauthz29/video/upload/v1730978205/white-christmas_ztcmxd.mp3",
        season: "december",
        premium: true,
    },
    {
        id: "we-wish-you-a-merry-christmas",
        title: "We Wish You a Merry Christmas",
        url: "https://res.cloudinary.com/deauthz29/video/upload/v1730978205/we-wish-you-a-merry-christmas_fcqhsn.mp3",
        season: "december",
        premium: false,
    },
    {
        id: "greensleeves",
        title: "Greensleeves",
        url: "https://res.cloudinary.com/deauthz29/video/upload/v1764420642/Greensleeves_ddi2zo.mp4",
        season: "december",
        premium: false,
    },
    {
        id: "carol-of-the-bells",
        title: "Carol of the Bells",
        url: "https://res.cloudinary.com/deauthz29/video/upload/v1730978205/carol-of-the-bells_asxlr9.mp3",
        season: "december",
        premium: false,
    },
    {
        id: "petit-papa-noel",
        title: "Petit Papa Noël",
        url: "https://res.cloudinary.com/deauthz29/video/upload/v1732811467/petit-papa-noel_pq0ywr.mp4",
        season: "december",
        premium: false,
    },
    {
        id: "halloween-dmitry-taras",
        title: "Halloween",
        url: "https://res.cloudinary.com/deauthz29/video/upload/Dmitry-Taras-Halloween_gacrmx.mp3",
        season: "october",
        premium: false,
    },
    {
        id: "halloween-mikhail-smusev",
        title: "Halloween Background Music",
        url: "https://res.cloudinary.com/deauthz29/video/upload/Mikhail-Smusev-Halloween_jqgdtd.mp3",
        season: "october",
        premium: false,
    },
];

export const currentMusicSeason: MusicSeason = isOctober
    ? "october"
    : "december";

export const getSeasonMusics = (season: MusicSeason): Music[] =>
    MUSICS.filter((music) => music.season === season);

// Free users get the free tracks, no choice.
// Premium users get every track, minus the ones they unchecked.
export const getAvailableMusics = (
    season: MusicSeason,
    isPremium: boolean,
    excludedIds: string[],
): Music[] => {
    const seasonMusics = getSeasonMusics(season);
    const freeMusics = seasonMusics.filter((music) => !music.premium);
    if (!isPremium) return freeMusics;

    const selected = seasonMusics.filter(
        (music) => !excludedIds.includes(music.id),
    );
    // Safety net: never end up without music.
    return selected.length > 0 ? selected : freeMusics;
};

export const getMusicForDay = (
    dayNumber: number,
    musics: Music[],
): Music | undefined => musics[(dayNumber - 1) % musics.length];
