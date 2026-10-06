import { Bar } from "./ColumnChart";
import { percent } from "./statsFormat";

export interface Slice extends Bar {
    color: string;
}

// A conic-gradient disc: each slice starts where the previous one ended.
export function PieChart({ slices }: Readonly<{ slices: Slice[] }>) {
    const total = slices.reduce((sum, slice) => sum + slice.value, 0);
    if (total === 0) return <p className="hint">Aucune donnée.</p>;

    let start = 0;
    const stops = slices.map((slice) => {
        const end = start + (slice.value / total) * 100;
        const stop = `${slice.color} ${start}% ${end}%`;
        start = end;
        return stop;
    });

    return (
        <div className="pie-chart">
            <div
                className="pie"
                style={{ background: `conic-gradient(${stops.join(", ")})` }}
            />
            <ul className="pie-legend">
                {slices.map((slice) => (
                    <li key={slice.label}>
                        <span
                            className="pie-swatch"
                            style={{ background: slice.color }}
                        />
                        <span className="pie-label">{slice.label}</span>
                        <span className="pie-value">
                            {slice.value} · {percent(slice.value, total)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
