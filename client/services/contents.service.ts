import { apiFetch } from "@/services/apiFetch";
import { Content } from "@/interfaces/contentInterface";
import { anecdotesData } from "@/data/contents/SheetToJSON.Anecdotes";
import { ideasData } from "@/data/contents/SheetToJSON.Ideas";
import { gamesData } from "@/data/contents/SheetToJSON.Games";
import { storyData } from "@/data/contents/SheetToJSON.Story";

// GET /content/contents serves the same content as the bundled
// client/data/contents/*.js files, now editable via the admin backoffice
// (Postgres) instead of requiring an app rebuild.
const fallbackContents: Content[] = [
    ...anecdotesData,
    ...ideasData,
    ...gamesData,
    ...storyData,
];

export const getAllContents = async (): Promise<Content[]> => {
    try {
        const data = await apiFetch<{ contents: Content[] }>("/content/contents");
        return data.contents;
    } catch (error) {
        // Offline, API down, or not configured yet — fall back to the
        // bundled snapshot so day content still works.
        console.error("Falling back to bundled contents data:", error);
        return fallbackContents;
    }
};
