import React, { createContext, useContext, useMemo } from "react";
import { StorageKeys } from "@/constants/storageKeys";
import { usePersistedPreference } from "@/hooks/usePersistedPreference";

const parseExcludedIds = (raw: string): string[] | null => {
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed)
            ? parsed.filter((id) => typeof id === "string")
            : null;
    } catch {
        return null;
    }
};

interface MusicSelectionContextType {
    // Unchecked tracks (premium only). Storing exclusions rather than
    // selections means every newly added track is checked by default.
    excludedIds: string[];
    setExcludedIds: (ids: string[]) => void;
}

const MusicSelectionContext = createContext<
    MusicSelectionContextType | undefined
>(undefined);

// Shared by Home and the settings screen so unchecking a track in Settings
// updates Home's music immediately.
export const MusicSelectionProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [excludedIds, setExcludedIds] = usePersistedPreference<string[]>(
        StorageKeys.excludedMusics,
        [],
        parseExcludedIds,
        (value) => JSON.stringify(value),
    );

    const value = useMemo(
        () => ({ excludedIds, setExcludedIds }),
        [excludedIds, setExcludedIds],
    );

    return (
        <MusicSelectionContext.Provider value={value}>
            {children}
        </MusicSelectionContext.Provider>
    );
};

export const useMusicSelection = () => {
    const context = useContext(MusicSelectionContext);
    if (!context) {
        throw new Error(
            "useMusicSelection must be used inside MusicSelectionProvider",
        );
    }
    return context;
};
