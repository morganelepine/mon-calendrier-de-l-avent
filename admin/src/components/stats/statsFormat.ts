import { DateCount } from "../../types";

export const percent = (part: number, total: number) =>
    total ? `${Math.round((part / total) * 100)} %` : "-";

export const formatDate = (date: string) => {
    const [, month, day] = date.split("-");
    return `${day}/${month}`;
};

// Every date between the first and last one with data, so gaps show as
// empty bars instead of silently collapsing the timeline.
export const fillDateGaps = (rows: DateCount[]): DateCount[] => {
    if (rows.length === 0) return [];
    const counts = new Map(rows.map((row) => [row.date, row.count]));
    const filled: DateCount[] = [];
    const cursor = new Date(`${rows[0].date}T00:00:00Z`);
    const last = new Date(`${rows[rows.length - 1].date}T00:00:00Z`);
    while (cursor <= last) {
        const date = cursor.toISOString().slice(0, 10);
        filled.push({ date, count: counts.get(date) ?? 0 });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return filled;
};

// "2026-08" -> "août"
export const formatMonth = (month: string) =>
    new Date(`${month}-01T00:00:00Z`).toLocaleDateString("fr-FR", {
        month: "long",
        timeZone: "UTC",
    });

// Every day of the given month (YYYY-MM), with 0 for days without data.
export const fillMonth = (rows: DateCount[], month: string): DateCount[] => {
    const counts = new Map(rows.map((row) => [row.date, row.count]));
    const [year, monthIndex] = month.split("-").map(Number);
    const daysInMonth = new Date(Date.UTC(year, monthIndex, 0)).getUTCDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
        const date = `${month}-${String(i + 1).padStart(2, "0")}`;
        return { date, count: counts.get(date) ?? 0 };
    });
};

// 2385656 -> "2 385 656"
export const formatNumber = (value: number) => value.toLocaleString("fr-FR");
