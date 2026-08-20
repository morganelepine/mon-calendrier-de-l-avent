import { ContentFamily } from "../types";

export const SUBTYPES_BY_TYPE: Record<ContentFamily, string[]> = {
    anecdote: ["anecdote", "word", "song", "drink"],
    idea: ["idea", "list", "recipe"],
    game: ["quiz-noel", "quiz-citation", "quiz-emojis", "pendu", "jeu"],
    story: ["story", "article"],
};

// content1-4 mean different things per family.
export const CONTENT_FIELD_LABELS: Record<
    ContentFamily,
    [string, string, string, string]
> = {
    anecdote: [
        "Texte",
        "Nom de la source",
        "URL de la source",
        "ID vidéo YouTube (optionnel)",
    ],
    idea: [
        "Texte / intro",
        "Détails (ex. ingrédients pour une recette, règles d'un jeu...)",
        "Source / crédit photo",
        "Sous-catégorie (ex. book, video, recipe, creator)",
    ],
    game: [
        "Question / indices",
        "Réponses (séparées par des virgules pour les quiz)",
        "Bonne réponse (pour les quiz — laisser vide sinon)",
        "Explication ou ID vidéo YouTube",
    ],
    story: [
        "Teaser (uniquement pour les articles)",
        "Texte / corps du chapitre",
        'Marqueur "end" (fin de chapitre — laisser vide sinon)',
        "Image (uniquement pour les articles)",
    ],
};
