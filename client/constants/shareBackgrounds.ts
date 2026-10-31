import { isOctober } from "@/constants/Dates";

// Cloudinary ids

const CHRISTMAS_COUNTDOWN_BACKGROUNDS: string[] = [
    "share-countdown-1_nqcrgc",
    // "share-countdown-3_adzy6s",
    "share-countdown-5_urab5g",
    "share-countdown-4_uemmif",
    "share-countdown-2_haglos",
    // "share-countdown-6_ti7bd6",
];
const HALLOWEEN_COUNTDOWN_BACKGROUNDS: string[] = [
    "share-countdown-halloween-2_askxlv",
    "share-countdown-halloween-3_uwgkyd",
    "share-countdown-halloween-4_w2cbl2",
    "share-countdown-halloween-5_duj6uz",
];

export const COUNTDOWN_SHARE_BACKGROUNDS = isOctober
    ? HALLOWEEN_COUNTDOWN_BACKGROUNDS
    : CHRISTMAS_COUNTDOWN_BACKGROUNDS;

export const QUIZ_SHARE_BACKGROUND = isOctober
    ? "share-quiz-autumn_rymfhb"
    : "share-quiz-christmas_cmjhej";
