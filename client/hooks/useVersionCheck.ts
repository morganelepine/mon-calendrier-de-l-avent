import { useCallback, useEffect, useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVersionRequirement } from "@/services/appconfig.service";
import { StorageKeys } from "@/constants/storageKeys";
import useAppState from "@/hooks/useAppState";

export type UpdateStatus =
    | { kind: "upToDate" }
    | { kind: "required"; message: string | null }
    | { kind: "recommended"; message: string | null; latestVersion: string };

function isOlderVersion(v1: string, v2: string): boolean {
    const a = v1.split(".").map(Number);
    const b = v2.split(".").map(Number);
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const x = a[i] ?? 0;
        const y = b[i] ?? 0;
        if (x < y) return true;
        if (x > y) return false;
    }
    return false;
}

export function useVersionCheck(): {
    status: UpdateStatus;
    dismissRecommended: () => void;
} {
    const [status, setStatus] = useState<UpdateStatus>({ kind: "upToDate" });
    const appState = useAppState();

    // Re-checked on every return to the foreground: the app often stays
    // open in the background for days in December.
    useEffect(() => {
        if (appState !== "active") return;

        async function check(): Promise<void> {
            try {
                const requirement = await getVersionRequirement();
                const current = Constants.expoConfig?.version ?? "0.0.0";

                if (
                    isOlderVersion(current, requirement.min_supported_version)
                ) {
                    setStatus({
                        kind: "required",
                        message: requirement.update_message,
                    });
                    return;
                }

                if (isOlderVersion(current, requirement.latest_version)) {
                    const dismissed = await AsyncStorage.getItem(
                        StorageKeys.dismissedUpdateVersion,
                    );
                    if (dismissed !== requirement.latest_version) {
                        setStatus({
                            kind: "recommended",
                            message: requirement.update_message,
                            latestVersion: requirement.latest_version,
                        });
                        return;
                    }
                }

                setStatus({ kind: "upToDate" });
            } catch (e) {
                console.log("Erreur version check:", e);
            }
        }

        check();
    }, [appState]);

    const dismissRecommended = useCallback(() => {
        if (status.kind !== "recommended") return;
        AsyncStorage.setItem(
            StorageKeys.dismissedUpdateVersion,
            status.latestVersion,
        ).catch(() => {});
        setStatus({ kind: "upToDate" });
    }, [status]);

    return { status, dismissRecommended };
}
