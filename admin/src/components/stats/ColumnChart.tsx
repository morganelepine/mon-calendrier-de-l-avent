import { CSSProperties } from "react";
import { percent } from "./statsFormat";

export interface Bar {
    label: string;
    value: number;
    showLabel?: boolean;
}

export function ColumnChart({
    bars,
    percentOf,
    secondaryPercentOf,
}: Readonly<{
    bars: Bar[];
    percentOf?: number;
    secondaryPercentOf?: number;
}>) {
    const max = Math.max(1, ...bars.map((bar) => bar.value));
    const labelWidth = Math.max(...bars.map((bar) => bar.label.length));
    return (
        <div
            className="column-chart"
            style={{ "--label-width": `${labelWidth}ch` } as CSSProperties}
        >
            {bars.map((bar) => {
                const shares = [percentOf, secondaryPercentOf]
                    .filter((base) => base !== undefined)
                    .map((base) => percent(bar.value, base));
                return (
                    // --ratio drives the bar's height, or its width on mobile
                    // where the chart turns into horizontal rows (see index.css).
                    <div
                        key={bar.label}
                        className="column"
                        title={`${bar.label} : ${bar.value} (${shares.join(" · ")})`}
                        style={{ "--ratio": bar.value / max } as CSSProperties}
                    >
                        <span className="column-value">
                            <span>{bar.value}</span>
                            {shares.map((share, index) => (
                                <span
                                    key={index}
                                    className={
                                        index === 0
                                            ? "column-percent"
                                            : "column-percent column-percent-secondary"
                                    }
                                >
                                    {share}
                                </span>
                            ))}
                        </span>
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
                );
            })}
        </div>
    );
}
