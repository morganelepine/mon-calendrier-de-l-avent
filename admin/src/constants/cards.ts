export function validateCards(json: string): string | null {
    let parsed;
    try {
        parsed = JSON.parse(json);
    } catch (e) {
        return `JSON invalide : ${(e as Error).message}`;
    }

    const cards = Array.isArray(parsed) ? { items: parsed } : parsed;
    if (!Array.isArray(cards?.items) || cards.items.length === 0) {
        return 'Il manque la liste "items".';
    }
    if (cards.labels !== undefined && typeof cards.labels !== "object") {
        return '"labels" doit être un objet (clé → libellé).';
    }
    for (const [i, item] of cards.items.entries()) {
        if (!item || typeof item !== "object" || Array.isArray(item)) {
            return `Élément ${i + 1} : ce doit être un objet.`;
        }
        const values = Object.values(item);
        if (values.length === 0 || !values[0]) {
            return `Élément ${i + 1} : la première clé (le titre) est vide.`;
        }
        if (values.some((value) => typeof value === "object")) {
            return `Élément ${i + 1} : les valeurs doivent être du texte.`;
        }
    }

    return null;
}
