import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { API_URL } from "@/constants/api";

function isOlderVersion(v1: string, v2: string) {
    const a = v1.split(".").map(Number);
    const b = v2.split(".").map(Number);
    for (let i = 0; i < a.length; i++) {
        if (a[i] < b[i]) return true;
        if (a[i] > b[i]) return false;
    }
    return false;
}

export function useVersionCheck() {
    const [requiresUpdate, setRequiresUpdate] = useState(false);

    useEffect(() => {
        async function check() {
            try {
                const response = await fetch(`${API_URL}/version`);
                const { min_required_version } = await response.json();
                const current = Constants.expoConfig?.version ?? "0.0.0";

                if (isOlderVersion(current, min_required_version)) {
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
