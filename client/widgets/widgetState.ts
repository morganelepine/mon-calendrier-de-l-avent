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

// "yes", "no", or null if never stored (or unreadable).
const readStoredPremium = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(StorageKeys.widgetsPremium);
    } catch {
        return null;
    }
};

export const readWidgetState = async (): Promise<WidgetState> => ({
    targetDay: await readChristmasTargetDay(),
    // Locked until the app has stored a known premium status.
    isPremium: (await readStoredPremium()) === "yes",
});

// Stores the premium status for the widgets. Returns whether the stored value
// changed, i.e. whether the widgets need redrawing. Never stored before counts
// as a change: widgets placed earlier may still show an outdated state.
export const storeWidgetsPremium = async (
    isPremium: boolean,
): Promise<boolean> => {
    const value = isPremium ? "yes" : "no";
    if ((await readStoredPremium()) === value) return false;
    await AsyncStorage.setItem(StorageKeys.widgetsPremium, value);
    return true;
};
