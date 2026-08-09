import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/services/apiFetch";

export const logClient = async (message: string, data?: any): Promise<void> => {
    try {
        const userUuid = await AsyncStorage.getItem("userUuid");

        await apiFetch("/client-log", {
            method: "POST",
            body: {
                message,
                data,
                uuid: userUuid ?? null,
                appVersion: Constants.expoConfig?.version ?? null,
                timestamp: Date.now(),
            },
        });
    } catch (_) {
        // volontairement silencieux
    }
};
