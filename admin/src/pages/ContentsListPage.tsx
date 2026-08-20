import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listContents } from "../services/contents.service";
import { logout } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { ContentFamily, ContentSummary } from "../types";

const TYPE_LABELS: Record<ContentFamily, string> = {
    story: "Histoire",
    idea: "Idée",
    anecdote: "Anecdote",
    game: "Jeu",
};

export function ContentsListPage() {
    const [contents, setContents] = useState<ContentSummary[]>([]);
    const [typeFilter, setTypeFilter] = useState<ContentFamily | "">("");
    const [loading, setLoading] = useState(true);
    const { setAuthenticated } = useAuth();

    useEffect(() => {
        listContents()
            .then(setContents)
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(
        () =>
            typeFilter
                ? contents.filter((c) => c.type === typeFilter)
                : contents,
        [contents, typeFilter],
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

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="contents-page">
            <header>
                <h1>Contenus</h1>
                <div className="header-actions">
                    <Link to="/contents/new" className="button">
                        + Nouveau
                    </Link>
                    <button type="button" onClick={handleLogout}>
                        Se déconnecter
                    </button>
                </div>
            </header>

            <label className="type-filter">
                Filtrer par type
                <select
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
            </label>

            {byDay.map(([day, items]) => (
                <section key={day}>
                    <h2>Jour {day}</h2>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <Link to={`/contents/${item.id}`}>
                                    [{TYPE_LABELS[item.type]}
                                    {item.subType
                                        ? ` · ${item.subType}`
                                        : ""}] {item.title || "(sans titre)"}
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
