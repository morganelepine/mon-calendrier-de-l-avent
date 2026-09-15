import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/storageKeys";
import { logClient } from "@/services/log.service";

interface PremiumContextType {
    isPremium: boolean;
    setIsPremium: (isPremium: boolean) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(
    undefined,
);

// TEMPORARY: there is no real subscription/entitlement backend yet, so
// premium status is just a persisted local flag a user can flip themselves
// (see the dev toggle in premium.tsx). Once real premium infra exists
// (server-side entitlement, IAP receipt validation...), this should read
// from that instead of AsyncStorage.
export const PremiumProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isPremium, setIsPremiumState] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem(StorageKeys.isPremium).then((stored) => {
            if (stored !== null) setIsPremiumState(stored === "yes");
        });
    }, []);

    const setIsPremium = useCallback((next: boolean): void => {
        setIsPremiumState(next);
        AsyncStorage.setItem(StorageKeys.isPremium, next ? "yes" : "no").catch(
            (error) => {
                console.error("Error setting premium flag", error);
                logClient("Error setting premium flag", {
                    error: String(error),
                });
            },
        );
    }, []);

    const value = useMemo(
        () => ({ isPremium, setIsPremium }),
        [isPremium, setIsPremium],
    );

    return (
        <PremiumContext.Provider value={value}>
            {children}
        </PremiumContext.Provider>
    );
};

export const usePremium = () => {
    const context = useContext(PremiumContext);
    if (!context) {
        throw new Error("usePremium must be used inside PremiumProvider");
    }
    return context;
};
