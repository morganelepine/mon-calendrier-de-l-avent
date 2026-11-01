import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/storageKeys";

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

export const initSentry = (): void => {
    Sentry.init({
        dsn,
        enabled: !!dsn,
        environment: __DEV__ ? "development" : "production",

        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production, or using tracesSampler for finer control
        tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    });
};

export { Sentry };

export const logClient = async (message: string, data?: any): Promise<void> => {
    try {
        const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);

        Sentry.captureMessage(message, {
            extra: {
                data,
                uuid: userUuid ?? null,
                appVersion: Constants.expoConfig?.version ?? null,
            },
        });
    } catch (_) {
        // volontairement silencieux
    }
};
