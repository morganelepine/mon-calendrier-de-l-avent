import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Sentry } from "@/services/sentry.service";
import { StorageKeys } from "@/constants/storageKeys";

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
