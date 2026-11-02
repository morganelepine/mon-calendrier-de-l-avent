import { StorageKeys } from "@/constants/storageKeys";
import { usePersistedPreference } from "@/hooks/usePersistedPreference";
import { MusicPreference } from "@/types/types";

// null until AsyncStorage has been read, so the player never autoplays on a guess.
export const useMusicPreference = (): [
    MusicPreference,
    (next: MusicPreference) => void,
] =>
    usePersistedPreference<MusicPreference>(
        StorageKeys.playMusic,
        null,
        (raw) => (raw === "yes" ? "yes" : "no"),
        (value) => value ?? "no",
    );
