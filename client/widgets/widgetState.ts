import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/storageKeys";
import { ChristmasTargetDay } from "@/enums/enums";
import { readChristmasTargetDay } from "@/utils/christmasTargetDay";

// What the widgets need from the app. They run headless (app possibly
// closed), so it's read from AsyncStorage rather than from the contexts.
export interface WidgetState {
    targetDay: ChristmasTargetDay;
    // Widgets are a La Hotte Magique feature: locked otherwise.
    isPremium: boolean;
}

const readIsPremium = async (): Promise<boolean> => {
    try {
        return (
            (await AsyncStorage.getItem(StorageKeys.widgetsPremium)) === "yes"
        );
    } catch {
        return false;
    }
};

export const readWidgetState = async (): Promise<WidgetState> => ({
    targetDay: await readChristmasTargetDay(),
    isPremium: await readIsPremium(),
});

// Stores the premium status for the widgets. Returns whether it changed,
// i.e. whether the widgets need redrawing.
export const storeWidgetsPremium = async (
    isPremium: boolean,
): Promise<boolean> => {
    if ((await readIsPremium()) === isPremium) return false;
    await AsyncStorage.setItem(
        StorageKeys.widgetsPremium,
        isPremium ? "yes" : "no",
    );
    return true;
};
