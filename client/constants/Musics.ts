import { isOctober } from "@/constants/Dates";
import { getCloudinaryAudioUrl } from "@/services/cloudinary.service";

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
        url: getCloudinaryAudioUrl("silent-night_ff2gwk"),
        season: "december",
        premium: false,
    },
    {
        id: "white-christmas",
        title: "White Christmas",
        url: getCloudinaryAudioUrl("white-christmas_ztcmxd"),
        season: "december",
        premium: true,
    },
    {
        id: "we-wish-you-a-merry-christmas",
        title: "We Wish You a Merry Christmas",
        url: getCloudinaryAudioUrl("we-wish-you-a-merry-christmas_fcqhsn"),
        season: "december",
        premium: false,
    },
    {
        id: "greensleeves",
        title: "Greensleeves",
        url: getCloudinaryAudioUrl("Greensleeves_ddi2zo"),
        season: "december",
        premium: false,
    },
    {
        id: "carol-of-the-bells",
        title: "Carol of the Bells",
        url: getCloudinaryAudioUrl("carol-of-the-bells_asxlr9"),
        season: "december",
        premium: false,
    },
    {
        id: "petit-papa-noel",
        title: "Petit Papa Noël",
        url: getCloudinaryAudioUrl("petit-papa-noel_pq0ywr"),
        season: "december",
        premium: false,
    },
    {
        id: "halloween-dmitry-taras",
        title: "Halloween",
        url: getCloudinaryAudioUrl("Dmitry-Taras-Halloween_gacrmx"),
        season: "october",
        premium: false,
    },
    {
        id: "halloween-mikhail-smusev",
        title: "Halloween Background Music",
        url: getCloudinaryAudioUrl("Mikhail-Smusev-Halloween_jqgdtd"),
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
