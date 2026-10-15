import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/storageKeys";
import { ChristmasTargetDay } from "@/enums/enums";

export const parseChristmasTargetDay = (
    raw: string,
): ChristmasTargetDay | null => {
    const parsed = Number(raw);
    return parsed === ChristmasTargetDay.Eve ||
        parsed === ChristmasTargetDay.Day
        ? parsed
        : null;
};

// Same default as CountdownVariantProvider.
// Used outside React, e.g. by the home screen widget's headless task,
// where the context isn't available.
export const readChristmasTargetDay = async (): Promise<ChristmasTargetDay> => {
    try {
        const stored = await AsyncStorage.getItem(
            StorageKeys.countdownTargetDay,
        );
        return (
            (stored !== null && parseChristmasTargetDay(stored)) ||
            ChristmasTargetDay.Day
        );
    } catch {
        return ChristmasTargetDay.Day;
    }
};
