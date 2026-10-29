import {
    RetrospectiveComparison,
    TimeProfile,
} from "@/interfaces/retrospectiveInterface";

// Below this, "plus que X % des joueurs" reads as a let-down: say nothing.
const MIN_HIGHER_THAN_PERCENT = 30;
// Above this, "top X %" isn't worth showing off.
const MAX_TOP_PERCENT = 50;

export const TIME_PROFILES: Record<
    TimeProfile,
    { title: string; emoji: string; description: string }
> = {
    morning: {
        title: "Lutin du matin",
        emoji: "☀️",
        description:
            "À peine réveillé·e, vous fonciez ouvrir votre case avant même la première boisson chaude.",
    },
    afternoon: {
        title: "Lutin du goûter",
        emoji: "🍪",
        description:
            "Entre deux biscuits et un chocolat chaud, la pause de l''après-midi était dédiée à votre case.",
    },
    evening: {
        title: "Lutin du soir",
        emoji: "🕯️",
        description:
            "Vous gardiez l'ouverture de votre case pour la soirée, comme on garde le meilleur pour la fin.",
    },
    night: {
        title: "Lutin noctambule",
        emoji: "🌙",
        description:
            "Quand tout le monde dormait, vous ouvriez votre case en douce, à la lueur des étoiles…",
    },
};

export const formatNumber = (value: number): string =>
    value.toLocaleString("fr-FR");

// French typography: non-breaking space before "%".
export const formatPercent = (percent: number): string => `${percent}\u00a0%`;

export const getHigherThanText = (
    comparison: RetrospectiveComparison,
): string | null =>
    comparison.lowerPercent >= MIN_HIGHER_THAN_PERCENT
        ? `C'est plus que ${formatPercent(comparison.lowerPercent)} des\u00a0joueur·euse·s`
        : null;

// With playerCount: "Top 2 % des 1 234 joueur·euse·s".
export const getTopText = (
    topPercent: number,
    playerCount?: number,
): string | null =>
    topPercent <= MAX_TOP_PERCENT
        ? `Top ${formatPercent(topPercent)} des\u00a0${playerCount ? `${formatNumber(playerCount)} ` : ""}joueur·euse·s`
        : null;
