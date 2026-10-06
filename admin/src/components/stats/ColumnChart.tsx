import { CSSProperties } from "react";

export interface Bar {
    label: string;
    value: number;
    showLabel?: boolean;
}

export function ColumnChart({
    bars,
    showValues,
}: Readonly<{ bars: Bar[]; showValues?: boolean }>) {
    const max = Math.max(1, ...bars.map((bar) => bar.value));
    const labelWidth = Math.max(...bars.map((bar) => bar.label.length));
    return (
        <div
            className="column-chart"
            style={{ "--label-width": `${labelWidth}ch` } as CSSProperties}
        >
            {bars.map((bar) => (
                // --ratio drives the bar's height, or its width on mobile
                // where the chart turns into horizontal rows (see index.css).
                <div
                    key={bar.label}
                    className="column"
                    title={`${bar.label} : ${bar.value}`}
                    style={{ "--ratio": bar.value / max } as CSSProperties}
                >
                    {showValues && (
                        <span className="column-value">{bar.value || ""}</span>
                    )}
                    <div className="column-bar" />
                    <span
                        className={
                            bar.showLabel === false
                                ? "column-label column-label-sparse"
                                : "column-label"
                        }
                    >
                        {bar.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
