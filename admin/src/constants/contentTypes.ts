import { ContentFamily } from "../types";

export const TYPE_LABELS: Record<ContentFamily, string> = {
    story: "Histoire",
    idea: "Idée",
    anecdote: "Anecdote",
    game: "Jeu",
};

// Same colours as the .type-tag-* classes of the contents list.
export const TYPE_COLORS: Record<ContentFamily, string> = {
    story: "#cf2c7d",
    idea: "#2b9a66",
    anecdote: "#0b84c1",
    game: "#f16800",
};
