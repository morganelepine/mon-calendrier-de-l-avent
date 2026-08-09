import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { getMinRequiredVersion } from "@/services/appconfig.service";

function isOlderVersion(v1: string, v2: string): boolean {
    const a = v1.split(".").map(Number);
    const b = v2.split(".").map(Number);
    for (let i = 0; i < a.length; i++) {
        if (a[i] < b[i]) return true;
        if (a[i] > b[i]) return false;
    }
    return false;
}

export function useVersionCheck(): boolean {
    const [requiresUpdate, setRequiresUpdate] = useState(false);

    useEffect(() => {
        async function check(): Promise<void> {
            try {
                const minRequiredVersion = await getMinRequiredVersion();
                const current = Constants.expoConfig?.version ?? "0.0.0";

                if (isOlderVersion(current, minRequiredVersion)) {
                    setRequiresUpdate(true);
                }
            } catch (e) {
                console.log("Erreur version check:", e);
            }
        }

        check();
    }, []);

    return requiresUpdate;
}
