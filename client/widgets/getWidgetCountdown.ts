import { getNow } from "@/constants/Dates";
import { ChristmasTargetDay } from "@/enums/enums";

const MILLISECONDS_IN_AN_HOUR = 1000 * 60 * 60;
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;
const DECEMBER = 11;
const CHRISTMAS_DAY = 25;

export type WidgetCountdown =
    // nights: same count as NightsCountdown
    // days/hours: same split as useCountdown (Columns variant)
    | { kind: "nights"; nights: number; days: number; hours: number }
    | { kind: "greeting"; message: string; top: string; bottom: string };

// Recomputed from a fresh "now" on every render: the widget's headless JS
// context can outlive a day, so the frozen `today` from Dates.ts would go stale.
// Mirrors Home.tsx.
export const getWidgetCountdown = (
    targetDay: ChristmasTargetDay,
    now: Date = new Date(getNow()),
): WidgetCountdown => {
    const isDecember = now.getMonth() === DECEMBER;
    const day = now.getDate();

    if (isDecember && day >= targetDay && day <= CHRISTMAS_DAY) {
        const isEve = targetDay === ChristmasTargetDay.Eve && day === 24;
        return {
            kind: "greeting",
            message: isEve ? "Joyeux réveillon de Noël !" : "Joyeux Noël !",
            top: "Joyeux",
            bottom: isEve ? "réveillon" : "Noël",
        };
    }

    const targetYear =
        isDecember && day > CHRISTMAS_DAY
            ? now.getFullYear() + 1
            : now.getFullYear();
    const target = new Date(targetYear, DECEMBER, targetDay);
    const remainingMs = target.getTime() - now.getTime();

    return {
        kind: "nights",
        nights: Math.ceil(remainingMs / MILLISECONDS_IN_A_DAY),
        days: Math.floor(remainingMs / MILLISECONDS_IN_A_DAY),
        hours: Math.floor(
            (remainingMs % MILLISECONDS_IN_A_DAY) / MILLISECONDS_IN_AN_HOUR,
        ),
    };
};
