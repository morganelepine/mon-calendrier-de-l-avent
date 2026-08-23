import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listContents } from "../services/contents.service";
import { logout } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { ContentFamily, ContentSummary, Season } from "../types";

const TYPE_LABELS: Record<ContentFamily, string> = {
    story: "Histoire",
    idea: "Idée",
    anecdote: "Anecdote",
    game: "Jeu",
};

const SEASON_LABELS: Record<Season, string> = {
    christmas: "Noël",
    halloween: "Halloween",
};

export function ContentsListPage() {
    const [contents, setContents] = useState<ContentSummary[]>([]);
    const [typeFilter, setTypeFilter] = useState<ContentFamily | "">("");
    const [seasonFilter, setSeasonFilter] = useState<Season | "">("christmas");
    const [loading, setLoading] = useState(true);
    const { setAuthenticated } = useAuth();

    useEffect(() => {
        listContents()
            .then(setContents)
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(
        () =>
            contents
                .filter((c) => !typeFilter || c.type === typeFilter)
                .filter((c) => !seasonFilter || c.season === seasonFilter),
        [contents, typeFilter, seasonFilter],
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
                    <Link to="/contents/new" className="button primary">
                        + Nouveau
                    </Link>
                    <button type="button" onClick={handleLogout}>
                        Se déconnecter
                    </button>
                </div>
            </header>

            <div className="type-filter">
                <label htmlFor="season-filter">Filtrer par saison</label>
                <select
                    id="season-filter"
                    value={seasonFilter}
                    onChange={(e) =>
                        setSeasonFilter(e.target.value as Season | "")
                    }
                >
                    <option value="">Toutes</option>
                    <option value="christmas">Noël</option>
                    <option value="halloween">Halloween</option>
                </select>

                <label htmlFor="type-filter">Filtrer par type</label>
                <select
                    id="type-filter"
                    value={typeFilter}
                    onChange={(e) =>
                        setTypeFilter(e.target.value as ContentFamily | "")
                    }
                >
                    <option value="">Tous</option>
                    <option value="anecdote">Anecdote</option>
                    <option value="idea">Idée</option>
                    <option value="game">Jeu</option>
                    <option value="story">Histoire</option>
                </select>
            </div>

            {byDay.map(([day, items]) => (
                <section key={day}>
                    <h2>Jour {day}</h2>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <Link to={`/contents/${item.id}`}>
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
                                {!item.published && (
                                    <span className="badge">brouillon</span>
                                )}
                                {item.isNew && (
                                    <span className="badge badge-new">
                                        nouveau
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
