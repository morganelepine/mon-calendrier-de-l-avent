import { API_URL } from "@/constants/api";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logClient = async (message: string, data?: any) => {
    try {
        const userUuid = await AsyncStorage.getItem("userUuid");

        await fetch(`${API_URL}/client-log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                data,
                uuid: userUuid ?? null,
                appVersion: Constants.expoConfig?.version ?? null,
                timestamp: Date.now(),
            }),
        });
    } catch (_) {
        // volontairement silencieux
    }
};
