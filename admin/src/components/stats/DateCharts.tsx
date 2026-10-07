import { useMemo, useState } from "react";
import { DateCount } from "../../types";
import { ColumnChart } from "./ColumnChart";
import {
    fillDateGaps,
    fillMonth,
    formatDate,
    formatMonth,
} from "./statsFormat";

const sumCounts = (rows: DateCount[]) =>
    rows.reduce((sum, row) => sum + row.count, 0);

// Percentages are shares of the whole period shown.
export function DateChart({ rows }: Readonly<{ rows: DateCount[] }>) {
    const filled = fillDateGaps(rows);
    if (filled.length === 0) return <p className="hint">Aucune donnée.</p>;

    // Roughly 8 labels whatever the range, plus always the last date.
    const labelEvery = Math.max(1, Math.ceil(filled.length / 8));
    return (
        <ColumnChart
            bars={filled.map((row, index) => ({
                label: formatDate(row.date),
                value: row.count,
                showLabel:
                    index % labelEvery === 0 || index === filled.length - 1,
            }))}
            percentOf={sumCounts(filled)}
        />
    );
}

// One month at a time, picked with a pill switch among the months that
// have data - the latest one by default.
export function MonthlyDateChart({ rows }: Readonly<{ rows: DateCount[] }>) {
    const months = useMemo(
        () => [...new Set(rows.map((row) => row.date.slice(0, 7)))].sort(),
        [rows],
    );
    const [selected, setSelected] = useState<string | null>(null);
    const month =
        selected && months.includes(selected) ? selected : months.at(-1);

    if (!month) return <p className="hint">Aucune donnée.</p>;

    const days = fillMonth(rows, month);
    return (
        <>
            <div className="month-switch">
                {months.map((m) => (
                    <button
                        key={m}
                        type="button"
                        className={m === month ? "primary" : undefined}
                        onClick={() => setSelected(m)}
                    >
                        {formatMonth(m)}
                    </button>
                ))}
            </div>
            <ColumnChart
                bars={days.map((row) => ({
                    label: String(Number(row.date.slice(8))),
                    value: row.count,
                }))}
            />
        </>
    );
}
