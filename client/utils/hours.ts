// Helpers for "hh:mm" hours, as used by the TV movies schedule.

export const MINUTES_IN_DAY = 24 * 60;

// "14:25" -> 865
export const toMinutes = (hour: string): number => {
    const [h, m] = hour.split(":").map(Number);
    return h * 60 + m;
};

// 865 -> "14:25", wrapping around midnight (-17 -> "23:43").
export const toHour = (minutes: number): string => {
    const m = ((minutes % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY;
    return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

// "01:13" -> "1h13", "14:25" -> "14h25"
export const formatHour = (hour: string): string => {
    const [h, m] = hour.split(":");
    return `${Number(h)}h${m}`;
};
