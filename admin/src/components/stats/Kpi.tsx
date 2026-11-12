export function Kpi({
    label,
    value,
    detail,
    href,
}: Readonly<{
    label: string;
    value: string;
    detail?: string;
    href?: string; // anchor of the section detailing this figure
}>) {
    const content = (
        <>
            <span className="kpi-label">{label}</span>
            <span className="kpi-value">{value}</span>
            {detail && <span className="kpi-detail">{detail}</span>}
        </>
    );

    return href ? (
        <a className="kpi kpi-link" href={href}>
            {content}
        </a>
    ) : (
        <div className="kpi">{content}</div>
    );
}
