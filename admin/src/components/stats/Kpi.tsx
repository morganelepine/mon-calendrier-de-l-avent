export function Kpi({
    label,
    value,
    detail,
}: Readonly<{ label: string; value: string; detail?: string }>) {
    return (
        <div className="kpi">
            <span className="kpi-label">{label}</span>
            <span className="kpi-value">{value}</span>
            {detail && <span className="kpi-detail">{detail}</span>}
        </div>
    );
}
