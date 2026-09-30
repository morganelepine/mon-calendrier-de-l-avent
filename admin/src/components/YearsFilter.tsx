import { useEffect, useRef, useState } from "react";
import { YEARS } from "../constants/years";

// "none" = drafts (no year); otherwise the checked years.
export type YearsFilterValue = number[] | "none";

interface Props {
    value: YearsFilterValue;
    onChange: (value: YearsFilterValue) => void;
}

// A native <select multiple> is a tall list box, so this is a select-looking
// button opening a panel of checkboxes instead.
export function YearsFilter({ value, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [open]);

    const years = value === "none" ? [] : value;
    const label =
        value === "none"
            ? "Brouillon"
            : years.length
              ? years.join(", ")
              : "Année";

    const toggleYear = (year: number, checked: boolean) =>
        onChange(
            checked
                ? [...years, year].sort((a, b) => a - b)
                : years.filter((y) => y !== year),
        );

    return (
        <div className="years-filter" ref={ref}>
            <button
                type="button"
                aria-label="Année"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
            >
                {label}
            </button>
            {open && (
                <div className="years-filter-panel">
                    {YEARS.map((year) => (
                        <label className="checkbox" key={year}>
                            <input
                                type="checkbox"
                                checked={years.includes(year)}
                                onChange={(e) =>
                                    toggleYear(year, e.target.checked)
                                }
                            />
                            {year}
                        </label>
                    ))}
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={value === "none"}
                            onChange={(e) =>
                                onChange(e.target.checked ? "none" : [])
                            }
                        />
                        Brouillon (aucune année)
                    </label>
                </div>
            )}
        </div>
    );
}
