import { CountdownValues } from "@/hooks/useCountdown";

export interface CountdownUnit {
    key: keyof CountdownValues;
    singular: string;
    plural: string;
}

const ALL_COUNTDOWN_UNITS: CountdownUnit[] = [
    { key: "days", singular: "jour", plural: "jours" },
    { key: "hours", singular: "heure", plural: "heures" },
    { key: "minutes", singular: "minute", plural: "minutes" },
    { key: "seconds", singular: "seconde", plural: "secondes" },
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

export const formatUnitLabel = (
    value: number,
    singular: string,
    plural: string,
): string => (value > 1 ? plural : singular);
