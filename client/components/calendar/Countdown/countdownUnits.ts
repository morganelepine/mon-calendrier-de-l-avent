import { CountdownValues } from "@/hooks/useCountdown";

export interface CountdownUnit {
    key: keyof CountdownValues;
    label: string; // singular, see pluralWord
}

const ALL_COUNTDOWN_UNITS: CountdownUnit[] = [
    { key: "days", label: "jour" },
    { key: "hours", label: "heure" },
    { key: "minutes", label: "minute" },
    { key: "seconds", label: "seconde" },
];

// Drops "seconds" unless showSeconds, and drops "days" once it's reached 0
// (the last calendar day before the target) rather than showing "0 jour".
export const getCountdownUnits = (
    showSeconds: boolean,
    days: number,
): CountdownUnit[] =>
    ALL_COUNTDOWN_UNITS.filter((unit) => {
        if (unit.key === "seconds") return showSeconds;
        if (unit.key === "days") return days > 0;
        return true;
    });
