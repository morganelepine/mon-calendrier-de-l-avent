import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Platform } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import * as Updates from "expo-updates";
import Purchases, {
    CustomerInfo,
    PurchasesPackage,
    LOG_LEVEL,
} from "react-native-purchases";
import { useUser } from "@/contexts/UserContext";
import { logClient } from "@/services/sentry.service";
import { refreshCountdownWidget } from "@/widgets/refreshCountdownWidget";
import { storeWidgetsPremium } from "@/widgets/widgetState";

// Must match the entitlement identifier configured in the RevenueCat dashboard.
const ENTITLEMENT_ID = "com_merrymate_moncalendrierdelavent_pro";

const IS_EXPO_GO =
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
const REVENUECAT_ANDROID_KEY = IS_EXPO_GO
    ? process.env.EXPO_PUBLIC_REVENUECAT_TEST_STORE_KEY
    : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;

// The preview APK uses a separate package id that Google Play and RevenueCat don't know.
const IS_PREVIEW_BUILD = Updates.channel === "preview";

export const PURCHASES_SUPPORTED =
    Platform.OS === "android" && !IS_PREVIEW_BUILD;

interface PremiumContextType {
    isPremium: boolean;
    // False until the initial restore + offerings fetch has settled, so the
    // purchase button can show a spinner instead of flashing "not premium".
    isReady: boolean;
    premiumPackage: PurchasesPackage | null;
    purchasePremium: () => Promise<void>;
    // Resolves to whether the restore found an active premium purchase.
    restorePurchases: () => Promise<boolean>;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

function hasActiveEntitlement(info: CustomerInfo | null): boolean {
    return !!info?.entitlements.active[ENTITLEMENT_ID];
}

// Device-side failures we can't act on (offline, outdated Play Store),
// which would otherwise flood Sentry on every start.
const IGNORED_ERROR_CODES: string[] = [
    Purchases.PURCHASES_ERROR_CODE.NETWORK_ERROR,
    Purchases.PURCHASES_ERROR_CODE.OFFLINE_CONNECTION_ERROR,
    Purchases.PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR,
];

function logPurchasesError(message: string, error: unknown) {
    const code = (error as { code?: string } | null)?.code;
    if (code && IGNORED_ERROR_CODES.includes(code)) return Promise.resolve();
    return logClient(message, { code, error: String(error) });
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

    useEffect(() => {
        // consistent-return requires every path in this effect to either
        // always return a cleanup function or never return one.
        if (!PURCHASES_SUPPORTED || !userUuid) return () => {};

        if (!REVENUECAT_ANDROID_KEY) {
            if (!IS_EXPO_GO)
                logClient("Missing EXPO_PUBLIC_REVENUECAT_ANDROID_KEY");
            setIsReady(true);
            return () => {};
        }

        if (__DEV__) Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        let cancelled = false;
        try {
            Purchases.configure({
                apiKey: REVENUECAT_ANDROID_KEY,
                appUserID: userUuid,
            });
        } catch (error) {
            logClient("RevenueCat configure failed", { error: String(error) });
            setIsReady(true);
            return () => {};
        }

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
                await logPurchasesError("RevenueCat restore failed", error);
            }

            try {
                const offerings = await Purchases.getOfferings();
                const current = offerings.current;
                const pkg = current?.lifetime ?? current?.availablePackages[0];
                if (!pkg) {
                    await logClient("RevenueCat no premium package", {
                        currentOffering: current?.identifier ?? null,
                        offerings: Object.keys(offerings.all),
                    });
                }
                if (!cancelled) setPremiumPackage(pkg ?? null);
            } catch (error) {
                await logPurchasesError(
                    "RevenueCat getOfferings failed",
                    error,
                );
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
        return hasActiveEntitlement(info);
    }, []);

    const isPremium = hasActiveEntitlement(customerInfo);

    // The home screen widgets are premium-only and run without the app:
    // keep their copy of the status up to date, and redraw them when it changes
    // (purchase, restore, dev override). Skipped while the status is unknown
    // (RevenueCat not loaded yet, or failed offline), so that an outage never
    // locks a premium user's widgets.
    useEffect(() => {
        if (!PURCHASES_SUPPORTED) return;
        if (customerInfo === null) return;

        storeWidgetsPremium(isPremium)
            .then((changed) => {
                if (changed) refreshCountdownWidget({ isPremium });
            })
            .catch((error) => {
                logClient("Error storing widgets premium status", {
                    error: String(error),
                });
            });
    }, [isPremium, customerInfo]);

    const value = useMemo(
        () => ({
            isPremium,
            isReady,
            premiumPackage,
            purchasePremium,
            restorePurchases,
        }),
        [isPremium, isReady, premiumPackage, purchasePremium, restorePurchases],
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
