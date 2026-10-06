import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listContents } from "../services/contents.service";
import { logout } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { TYPE_LABELS } from "../constants/contentTypes";
import { YearsFilter, YearsFilterValue } from "../components/YearsFilter";
import { ContentFamily, ContentSummary, Season } from "../types";

const SEASON_LABELS: Record<Season, string> = {
    christmas: "Noël",
    halloween: "Halloween",
};

export function ContentsListPage() {
    const [contents, setContents] = useState<ContentSummary[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = (searchParams.get("type") ?? "") as ContentFamily | "";
    const seasonFilter = (searchParams.get("season") ?? "christmas") as
        | Season
        | "";
    // ?year=2024,2026 or ?year=none (drafts)
    const yearParam = searchParams.get("year") ?? "2026";
    const yearFilter = useMemo<YearsFilterValue>(
        () =>
            yearParam === "none"
                ? "none"
                : yearParam.split(",").filter(Boolean).map(Number),
        [yearParam],
    );
    const [loading, setLoading] = useState(true);
    const { setAuthenticated } = useAuth();

    const setTypeFilter = (value: ContentFamily | "") => {
        setSearchParams(
            (params) => {
                if (value) params.set("type", value);
                else params.delete("type");
                return params;
            },
            { replace: true },
        );
    };

    const setSeasonFilter = (value: Season | "") => {
        setSearchParams(
            (params) => {
                // Kept even when empty: a missing param means "christmas".
                params.set("season", value);
                return params;
            },
            { replace: true },
        );
    };

    const setYearFilter = (value: YearsFilterValue) => {
        setSearchParams(
            (params) => {
                if (value === "none") params.set("year", value);
                else if (value.length) params.set("year", value.join(","));
                else params.delete("year");
                return params;
            },
            { replace: true },
        );
    };

    useEffect(() => {
        listContents()
            .then(setContents)
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(
        () =>
            contents
                .filter((c) => !typeFilter || c.type === typeFilter)
                .filter((c) => !seasonFilter || c.season === seasonFilter)
                .filter((c) =>
                    yearFilter === "none"
                        ? c.years.length === 0
                        : yearFilter.every((year) => c.years.includes(year)),
                ),
        [contents, typeFilter, seasonFilter, yearFilter],
    );

    const byDay = useMemo(() => {
        const map = new Map<number, ContentSummary[]>();
        for (const item of filtered) {
            const list = map.get(item.dayNumber) ?? [];
            list.push(item);
            map.set(item.dayNumber, list);
        }
        return [...map.entries()].sort(([a], [b]) => a - b);
    }, [filtered]);

    const handleLogout = async () => {
        await logout().catch(() => {});
        setAuthenticated(false);
    };

    if (loading) return <p className="loading">Ho ho ho...</p>;

    return (
        <div className="contents-page">
            <header>
                <h1>Contenus</h1>
                <div className="header-actions">
                    <Link to="/stats" className="button">
                        Statistiques
                    </Link>
                    <button type="button" onClick={handleLogout}>
                        Se déconnecter
                    </button>
                </div>
            </header>

            <div className="filters-container">
                <div className="type-filter">
                    <span>Filtrer par</span>
                    <select
                        aria-label="Saison"
                        value={seasonFilter}
                        onChange={(e) =>
                            setSeasonFilter(e.target.value as Season | "")
                        }
                    >
                        <option value="">Saison</option>
                        <option value="christmas">Noël</option>
                        <option value="halloween">Halloween</option>
                    </select>

                    <select
                        aria-label="Type"
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(e.target.value as ContentFamily | "")
                        }
                    >
                        <option value="">Type</option>
                        <option value="anecdote">Anecdote</option>
                        <option value="idea">Idée</option>
                        <option value="game">Jeu</option>
                        <option value="story">Histoire</option>
                    </select>

                    <YearsFilter value={yearFilter} onChange={setYearFilter} />
                </div>

                <Link
                    to={`/contents/new?${searchParams.toString()}`}
                    className="button primary"
                >
                    + Nouveau
                </Link>
            </div>

            {byDay.map(([day, items]) => (
                <section key={day}>
                    <h2>Jour {day}</h2>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={`/contents/${item.id}?${searchParams.toString()}`}
                                >
                                    <span
                                        className={`type-tag type-tag-${item.type}`}
                                    >
                                        [{SEASON_LABELS[item.season]}] [
                                        {TYPE_LABELS[item.type]}]
                                        {item.subType
                                            ? ` [${item.subType}]`
                                            : ""}
                                    </span>{" "}
                                    {item.title || "(sans titre)"}
                                </Link>
                                {item.years.map((year) => (
                                    <span
                                        key={year}
                                        className={`badge badge-year-${year}`}
                                    >
                                        {year}
                                    </span>
                                ))}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
