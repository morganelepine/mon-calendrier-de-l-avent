import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getStats } from "../services/stats.service";
import { YEARS } from "../constants/years";
import { TYPE_COLORS, TYPE_LABELS } from "../constants/contentTypes";
import { ColumnChart } from "../components/stats/ColumnChart";
import { PieChart } from "../components/stats/PieChart";
import { DateChart, MonthlyDateChart } from "../components/stats/DateCharts";
import { Kpi } from "../components/stats/Kpi";
import { formatNumber, percent } from "../components/stats/statsFormat";
import { Season, Stats } from "../types";

const DAYS_BY_SEASON: Record<Season, number> = {
    christmas: 25,
    halloween: 31,
};

const DEFAULT_SEASON: Season =
    new Date().getMonth() === 9 ? "halloween" : "christmas";

export function StatsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const season = (searchParams.get("season") ?? DEFAULT_SEASON) as Season;
    const year = Number(searchParams.get("year")) || YEARS[YEARS.length - 1];
    const [stats, setStats] = useState<Stats | null>(null);
    const [error, setError] = useState(false);

    const setParam = (key: string, value: string) => {
        setSearchParams(
            (params) => {
                params.set(key, value);
                return params;
            },
            { replace: true },
        );
    };

    useEffect(() => {
        setStats(null);
        setError(false);
        getStats(year, season)
            .then(setStats)
            .catch(() => setError(true));
    }, [year, season]);

    const dayBars = useMemo(() => {
        if (!stats) return [];
        const users = new Map(
            stats.openingsByDay.map((row) => [row.day, row.users]),
        );
        return Array.from({ length: DAYS_BY_SEASON[season] }, (_, i) => ({
            label: String(i + 1),
            value: users.get(i + 1) ?? 0,
        }));
    }, [stats, season]);

    return (
        <div className="stats-page">
            <header>
                <h1>Statistiques</h1>
                <div className="header-actions">
                    <Link to="/" className="button">
                        Contenus
                    </Link>
                </div>
            </header>

            <div className="type-filter">
                <span>Filtrer par</span>
                <div className="filters">
                    <select
                        aria-label="Saison"
                        value={season}
                        onChange={(e) => setParam("season", e.target.value)}
                    >
                        <option value="christmas">Noël</option>
                        <option value="halloween">Halloween</option>
                    </select>
                    <select
                        aria-label="Année"
                        value={year}
                        onChange={(e) => setParam("year", e.target.value)}
                    >
                        {YEARS.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <p className="error">Impossible de charger les statistiques.</p>
            )}
            {!stats && !error && <p className="loading">Ho ho ho...</p>}

            {stats && (
                <>
                    <h2>Aujourd'hui</h2>

                    <div className="kpis">
                        <Kpi
                            label="Utilisateur·ice·s"
                            value={String(stats.notifications.total)}
                        />
                        <Kpi
                            label="Premium"
                            value={percent(
                                stats.premium.premium,
                                stats.premium.total,
                            )}
                            detail={`${stats.premium.premium} utilisateur·ice·s`}
                        />
                        <Kpi
                            label="Groupes"
                            value={String(stats.groups.count)}
                            detail={`${stats.groups.avgSize.toFixed(1)} membres en moyenne`}
                        />
                        <Kpi
                            label="Dans un groupe"
                            value={percent(
                                stats.groups.usersInGroup,
                                stats.groups.totalUsers,
                            )}
                            detail={`${stats.groups.usersInGroup} utilisateur·ice·s`}
                        />
                        <Kpi
                            label="Notifications"
                            value={percent(
                                stats.notifications.withToken,
                                stats.notifications.total,
                            )}
                            detail={`${stats.notifications.withToken} utilisateur·ice·s`}
                        />
                    </div>

                    <h2>Pseudos</h2>
                    <div className="kpis">
                        <Kpi
                            label="Liste de base"
                            value={formatNumber(stats.usernames.curated)}
                            detail="usernames.ts"
                        />
                        <Kpi
                            label="Disponibles"
                            value={percent(
                                stats.usernames.curatedAvailable,
                                stats.usernames.curated,
                            )}
                            detail={`${formatNumber(
                                stats.usernames.curatedAvailable,
                            )} noms disponibles`}
                        />
                        <Kpi
                            label="Possibles"
                            value={formatNumber(stats.usernames.possible)}
                            detail="liste de base + segments"
                        />
                    </div>

                    <h2>Ancienneté · Activité</h2>
                    <PieChart
                        slices={[
                            {
                                label: `Avant ${year} · avec score`,
                                value: stats.userCohorts.returningActive,
                                color: "#0b84c1",
                            },
                            {
                                label: `Avant ${year} · sans score`,
                                value: stats.userCohorts.returningInactive,
                                color: "#9ccbe8",
                            },
                            {
                                label: `En ${year} · avec score`,
                                value: stats.userCohorts.newActive,
                                color: "#f16800",
                            },
                            {
                                label: `En ${year} · sans score`,
                                value: stats.userCohorts.newInactive,
                                color: "#f8bf94",
                            },
                        ]}
                    />

                    <h2>Ouvertures par case</h2>
                    <p className="hint">Cases ouvertes le jour même</p>
                    <ColumnChart bars={dayBars} showValues />

                    {stats.openingsByType && (
                        <>
                            <h2>Ouvertures par contenu</h2>
                            <PieChart
                                slices={stats.openingsByType.map((row) => ({
                                    label: TYPE_LABELS[row.type] ?? row.type,
                                    value: row.users,
                                    color: TYPE_COLORS[row.type] ?? "#8d8d8d",
                                }))}
                            />
                        </>
                    )}

                    <h2>Nouveaux membres</h2>
                    <MonthlyDateChart rows={stats.newUsersByDate} showValues />

                    <h2>Nouveaux premium</h2>
                    <DateChart rows={stats.premium.byDate} />
                </>
            )}
        </div>
    );
}
