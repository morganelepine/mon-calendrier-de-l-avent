import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Platform } from "react-native";
import Purchases, {
    CustomerInfo,
    PurchasesPackage,
    LOG_LEVEL,
} from "react-native-purchases";
import { useUser } from "@/contexts/UserContext";
import { logClient } from "@/services/log.service";

// Must match the entitlement identifier configured in the RevenueCat dashboard.
const ENTITLEMENT_ID = "premium";

const REVENUECAT_ANDROID_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;

export const PURCHASES_SUPPORTED = Platform.OS === "android";

interface PremiumContextType {
    isPremium: boolean;
    // False until the initial restore + offerings fetch has settled, so the
    // purchase button can show a spinner instead of flashing "not premium".
    isReady: boolean;
    premiumPackage: PurchasesPackage | null;
    purchasePremium: () => Promise<void>;
    restorePurchases: () => Promise<void>;
    // DEV ONLY: stand-in to preview the premium/free experience without a real purchase.
    // Remove once real purchases have been exercised end-to-end and this is no longer needed for QA.
    devOverride: boolean | null;
    setDevOverride: (value: boolean | null) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

function hasActiveEntitlement(info: CustomerInfo | null): boolean {
    return !!info?.entitlements.active[ENTITLEMENT_ID];
}

export const PremiumProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { userUuid } = useUser();
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
    const [premiumPackage, setPremiumPackage] =
        useState<PurchasesPackage | null>(null);
    const [isReady, setIsReady] = useState(!PURCHASES_SUPPORTED);
    const [devOverride, setDevOverride] = useState<boolean | null>(null);

    useEffect(() => {
        // consistent-return requires every path in this effect to either
        // always return a cleanup function or never return one.
        if (!PURCHASES_SUPPORTED || !userUuid) return () => {};

        if (!REVENUECAT_ANDROID_KEY) {
            logClient("Missing EXPO_PUBLIC_REVENUECAT_ANDROID_KEY");
            setIsReady(true);
            return () => {};
        }

        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        let cancelled = false;
        Purchases.configure({
            apiKey: REVENUECAT_ANDROID_KEY,
            appUserID: userUuid,
        });

        const listener = (info: CustomerInfo) => {
            if (!cancelled) setCustomerInfo(info);
        };
        Purchases.addCustomerInfoUpdateListener(listener);

        (async () => {
            try {
                // Reattaches this Google account's Play Store purchase (if any) to the current appUserID.
                // Covers reinstalls and phone changes: the local uuid gets regenerated,
                // but the Play Store purchase itself is tied to the Google account, not the device or the app install.
                const info = await Purchases.restorePurchases();
                if (!cancelled) setCustomerInfo(info);
            } catch (error) {
                await logClient("RevenueCat restore failed", {
                    error: String(error),
                });
            }

            try {
                const offerings = await Purchases.getOfferings();
                const current = offerings.current;
                const pkg = current?.lifetime ?? current?.availablePackages[0];
                if (!cancelled) setPremiumPackage(pkg ?? null);
            } catch (error) {
                await logClient("RevenueCat getOfferings failed", {
                    error: String(error),
                });
            } finally {
                if (!cancelled) setIsReady(true);
            }
        })();

        return () => {
            cancelled = true;
            Purchases.removeCustomerInfoUpdateListener(listener);
        };
    }, [userUuid]);

    const purchasePremium = useCallback(async () => {
        if (!premiumPackage) throw new Error("No premium package available");
        const { customerInfo: info } =
            await Purchases.purchasePackage(premiumPackage);
        setCustomerInfo(info);
    }, [premiumPackage]);

    const restorePurchases = useCallback(async () => {
        const info = await Purchases.restorePurchases();
        setCustomerInfo(info);
    }, []);

    const isPremium = devOverride ?? hasActiveEntitlement(customerInfo);

    const value = useMemo(
        () => ({
            isPremium,
            isReady,
            premiumPackage,
            purchasePremium,
            restorePurchases,
            devOverride,
            setDevOverride,
        }),
        [
            isPremium,
            isReady,
            premiumPackage,
            purchasePremium,
            restorePurchases,
            devOverride,
        ],
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
