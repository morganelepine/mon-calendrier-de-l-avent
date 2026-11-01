import { CardsData } from "@/interfaces/contentInterface";

// Accepts either { description?, labels?, items } or a bare array of items.
// Returns null on malformed JSON so a bad edit in the admin hides the cards
// instead of crashing the screen.
export const parseCards = (json: string): CardsData | null => {
    try {
        const parsed = JSON.parse(json);
        const cards = Array.isArray(parsed) ? { items: parsed } : parsed;
        if (!Array.isArray(cards?.items) || cards.items.length === 0) {
            return null;
        }
        return cards;
    } catch {
        return null;
    }
};
