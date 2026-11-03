import { DevSettings } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/storageKeys";
import * as Updates from "expo-updates";

// Dates and most seasonal values are computed once at module load,
// so a fake date change only takes effect after a full reload.
export const reloadApp = async (): Promise<void> => {
    if (__DEV__) {
        DevSettings.reload();
    } else {
        await Updates.reloadAsync();
    }
};

// Simulates a fresh install: on reload, useInitialization finds no uuid and
// creates a brand-new user.
export const resetUser = async (): Promise<void> => {
    await AsyncStorage.clear();
    await reloadApp();
};

export const resetCalendar = async (): Promise<void> => {
    await AsyncStorage.multiRemove([
        StorageKeys.calendar,
        StorageKeys.octoberCalendar,
        StorageKeys.gameState,
        StorageKeys.objectiveCelebrated,
    ]);
    await reloadApp();
};
