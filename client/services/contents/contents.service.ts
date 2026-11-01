import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/services/apiFetch";
import { StorageKeys } from "@/constants/storageKeys";
import { Content } from "@/interfaces/contentInterface";

export const getAllContents = async (): Promise<Content[]> => {
    try {
        const data = await apiFetch<{ contents: Content[] }>(
            "/content/contents",
        );
        // Fire-and-forget: cache the fresh contents for the next outage,
        // don't make the caller wait on it.
        AsyncStorage.setItem(
            StorageKeys.contentsCache,
            JSON.stringify(data.contents),
        ).catch(() => {});
        return data.contents;
    } catch (error) {
        // Offline, API down, or not configured yet — fall back to the last
        // successfully fetched contents so day content still works.
        console.error("Falling back to cached contents data:", error);
        const cached = await AsyncStorage.getItem(StorageKeys.contentsCache);
        if (cached) return JSON.parse(cached) as Content[];

        // Nothing to fall back to (e.g. first launch with no prior
        // successful fetch) — let callers show a real error state instead
        // of silently rendering empty content.
        throw error;
    }
};
