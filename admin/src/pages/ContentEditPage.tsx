import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    createContent,
    deleteContent,
    getContent,
    updateContent,
} from "../services/contents.service";
import {
    CONTENT_FIELD_LABELS,
    SUBTYPES_BY_TYPE,
} from "../constants/contentSubtypes";
import { ContentFamily, ContentInput, ContentListItemInput } from "../types";

const EMPTY: ContentInput = {
    dayNumber: 1,
    type: "anecdote",
    subType: "anecdote",
    title: "",
    content1: "",
    content2: "",
    content3: "",
    content4: "",
    media: "",
    published: true,
    isNew: false,
    listItems: [],
};

export function ContentEditPage() {
    const { id } = useParams<{ id: string }>();
    const isNew = id === "new";
    const navigate = useNavigate();

    const [form, setForm] = useState<ContentInput>(EMPTY);
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isNew) return;
        getContent(Number(id))
            .then((content) =>
                setForm({
                    dayNumber: content.dayNumber,
                    type: content.type,
                    subType: content.subType,
                    title: content.title,
                    content1: content.content1,
                    content2: content.content2,
                    content3: content.content3,
                    content4: content.content4,
                    media: content.media,
                    published: content.published,
                    isNew: content.isNew,
                    listItems: content.listItems.map((item) => ({
                        title: item.title,
                        description: item.description,
                        author: item.author,
                        image: item.image,
                        url: item.url,
                    })),
                }),
            )
            .finally(() => setLoading(false));
    }, [id, isNew]);

    const handleTypeChange = (type: ContentFamily) => {
        setForm((f) => ({ ...f, type, subType: SUBTYPES_BY_TYPE[type][0] }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSaving(true);
        try {
            if (isNew) {
                const created = await createContent(form);
                navigate(`/contents/${created.id}`, { replace: true });
            } else {
                await updateContent(Number(id), form);
            }
        } catch {
            setError("Échec de l'enregistrement.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Supprimer ce contenu ?")) return;
        await deleteContent(Number(id));
        navigate("/", { replace: true });
    };

    const updateListItem = (
        index: number,
        patch: Partial<ContentListItemInput>,
    ) => {
        setForm((f) => ({
            ...f,
            listItems: f.listItems.map((item, i) =>
                i === index ? { ...item, ...patch } : item,
            ),
        }));
    };

    const addListItem = () => {
        setForm((f) => ({
            ...f,
            listItems: [
                ...f.listItems,
                { title: "", description: "", author: "", image: "", url: "" },
            ],
        }));
    };

    const removeListItem = (index: number) => {
        setForm((f) => ({
            ...f,
            listItems: f.listItems.filter((_, i) => i !== index),
        }));
    };

    const moveListItem = (index: number, direction: -1 | 1) => {
        setForm((f) => {
            const target = index + direction;
            if (target < 0 || target >= f.listItems.length) return f;
            const items = [...f.listItems];
            [items[index], items[target]] = [items[target], items[index]];
            return { ...f, listItems: items };
        });
    };

    if (loading) return <p>Chargement...</p>;

    const labels = CONTENT_FIELD_LABELS[form.type];
    const showListEditor = form.type === "idea" && form.subType === "list";

    return (
        <div className="content-edit-page">
            <Link to="/">&larr; Retour à la liste</Link>
            <h1>{isNew ? "Nouveau contenu" : `Contenu #${id}`}</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Jour
                    <input
                        type="number"
                        min={1}
                        max={25}
                        value={form.dayNumber}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                dayNumber: Number(e.target.value),
                            }))
                        }
                    />
                </label>

                <label>
                    Type
                    <select
                        value={form.type}
                        onChange={(e) =>
                            handleTypeChange(e.target.value as ContentFamily)
                        }
                    >
                        <option value="anecdote">Anecdote</option>
                        <option value="idea">Idée</option>
                        <option value="game">Jeu</option>
                        <option value="story">Histoire</option>
                    </select>
                </label>

                <label>
                    Sous-type
                    <select
                        value={form.subType}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, subType: e.target.value }))
                        }
                    >
                        {SUBTYPES_BY_TYPE[form.type].map((st) => (
                            <option key={st} value={st}>
                                {st}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Titre
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, title: e.target.value }))
                        }
                    />
                </label>

                <label>
                    {labels[0]}
                    <textarea
                        rows={5}
                        value={form.content1}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, content1: e.target.value }))
                        }
                    />
                </label>
                <label>
                    {labels[1]}
                    <textarea
                        rows={3}
                        value={form.content2}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, content2: e.target.value }))
                        }
                    />
                </label>
                <label>
                    {labels[2]}
                    <textarea
                        rows={2}
                        value={form.content3}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, content3: e.target.value }))
                        }
                    />
                </label>
                <label>
                    {labels[3]}
                    <textarea
                        rows={2}
                        value={form.content4}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, content4: e.target.value }))
                        }
                    />
                </label>

                <label>
                    Média (id Cloudinary)
                    <input
                        type="text"
                        value={form.media}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, media: e.target.value }))
                        }
                    />
                </label>

                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={form.published}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                published: e.target.checked,
                            }))
                        }
                    />
                    Publié
                </label>

                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={form.isNew}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, isNew: e.target.checked }))
                        }
                    />
                    Nouveau cette année
                </label>

                {showListEditor && (
                    <fieldset>
                        <legend>Éléments de la liste</legend>
                        {form.listItems.map((item, index) => (
                            <div className="list-item" key={index}>
                                <div className="list-item-controls">
                                    <button
                                        type="button"
                                        onClick={() => moveListItem(index, -1)}
                                        disabled={index === 0}
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveListItem(index, 1)}
                                        disabled={
                                            index === form.listItems.length - 1
                                        }
                                    >
                                        ↓
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeListItem(index)}
                                        className="danger"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Titre"
                                    value={item.title}
                                    onChange={(e) =>
                                        updateListItem(index, {
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    placeholder="Description"
                                    rows={2}
                                    value={item.description}
                                    onChange={(e) =>
                                        updateListItem(index, {
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Auteur"
                                    value={item.author}
                                    onChange={(e) =>
                                        updateListItem(index, {
                                            author: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Image (id Cloudinary)"
                                    value={item.image}
                                    onChange={(e) =>
                                        updateListItem(index, {
                                            image: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={item.url}
                                    onChange={(e) =>
                                        updateListItem(index, {
                                            url: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addListItem}>
                            + Ajouter un élément
                        </button>
                    </fieldset>
                )}

                {error && <p className="error">{error}</p>}

                <div className="actions">
                    <button type="submit" disabled={saving}>
                        {saving ? "Enregistrement..." : "Enregistrer"}
                    </button>
                    {!isNew && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="danger"
                        >
                            Supprimer
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
