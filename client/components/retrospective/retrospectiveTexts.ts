import {
    RetrospectiveComparison,
    TimeProfile,
} from "@/interfaces/retrospectiveInterface";

// Below this, "plus que X % des joueurs" reads as a let-down: say nothing.
const MIN_HIGHER_THAN_PERCENT = 30;
// Above this, "top X %" isn't worth showing off.
const MAX_TOP_PERCENT = 50;

// Slots: keep in sync with server/src/controllers/retrospective.controller.ts
export const TIME_PROFILES: Record<
    TimeProfile,
    { title: string; slot: string; description: string }
> = {
    dawn: {
        title: "Lutin de l'aube",
        slot: "entre 5h et 9h",
        description:
            "La Mère Noël n'avait même pas fini son café que vous aviez déjà ouvert votre case !",
    },
    morning: {
        title: "Lutin matinal",
        slot: "entre 9h et 12h",
        description:
            "Une tasse fumante à la main, vous vous offriez une parenthèse enchantée au milieu de la matinée. Les lutins appellent ça une pause bien méritée !",
    },
    afternoon: {
        title: "Lutin flâneur",
        slot: "entre 12h et 17h",
        description:
            "Entre deux biscuits, votre case avait sa place réservée. Une pause sucrée, une pincée de magie, et la journée repartait de plus belle.",
    },
    evening: {
        title: "Lutin du soir",
        slot: "entre 17h et 22h",
        description:
            "Pourquoi se précipiter ? Vous gardiez l'ouverture de votre case pour la soirée, comme on garde le meilleur pour la fin.",
    },
    night: {
        title: "Lutin des étoiles",
        slot: "entre 22h et 5h",
        description:
            "Pendant que les autres rêvaient de Noël, vous étiez déjà en train de découvrir ses secrets…",
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
        ? `Top ${formatPercent(topPercent)}\ndes\u00a0${playerCount ? `${formatNumber(playerCount)} ` : ""}joueur·euse·s`
        : null;
