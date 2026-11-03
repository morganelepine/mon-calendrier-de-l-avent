import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useReducedMotion } from "react-native-reanimated";
import { StorageKeys } from "@/constants/storageKeys";

type CelebrationStatus = "idle" | "celebrating" | "celebrated";

// Plays the celebration only the first time each objective is seen reached:
// the highest celebrated objective is stored, so a user who goes premium
// gets a second one for the bigger objective.
export const useObjectiveCelebration = (
    objective: number,
    hasReachedObjective: boolean,
): { status: CelebrationStatus; finish: () => void } => {
    const reduceMotion = useReducedMotion();
    const [status, setStatus] = useState<CelebrationStatus>("idle");

    useEffect(() => {
        let cancelled = false;
        (async (): Promise<void> => {
            if (!hasReachedObjective || reduceMotion) return;
            const celebrated = Number(
                await AsyncStorage.getItem(StorageKeys.objectiveCelebrated),
            );
            if (cancelled || celebrated >= objective) return;
            // Stored before playing so leaving mid-animation doesn't replay it.
            await AsyncStorage.setItem(
                StorageKeys.objectiveCelebrated,
                String(objective),
            );
            if (!cancelled) setStatus("celebrating");
        })().catch(() => {});
        return (): void => {
            cancelled = true;
        };
    }, [objective, hasReachedObjective, reduceMotion]);

    const finish = useCallback((): void => setStatus("celebrated"), []);

    return { status, finish };
};
