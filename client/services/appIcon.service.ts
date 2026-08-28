import { Platform } from "react-native";
import { isOctober } from "@/constants/Dates";

// Two named icons are declared in app.json (expo-dynamic-app-icon plugin) -
// "christmas" and "halloween" - and we always target one of them explicitly.
// We never rely on resetting to the app's "default"/primary icon at
// runtime: on iOS, `setAppIcon` needs a non-null string and there is no
// documented way to hand it back a real `nil` (the only value that actually
// restores the primary icon), so treating "christmas" as just another named
// icon - rather than "no icon set" - sidesteps that limitation entirely.
const SEASONAL_ICON_NAME = isOctober ? "halloween" : "christmas";

// Best-effort, fire-and-forget: called once on app start (see app/_layout.tsx).
// Dynamically imported because this package's native module doesn't exist on
// web - a static top-level import would throw as soon as this file loads,
// even if the call below were guarded, since requireNativeModule() runs at
// import time.
export const syncAppIcon = async (): Promise<void> => {
    if (Platform.OS === "web") return;

    try {
        const { getAppIcon, setAppIcon } = await import(
            "expo-dynamic-app-icon"
        );
        if (getAppIcon() !== SEASONAL_ICON_NAME) {
            setAppIcon(SEASONAL_ICON_NAME);
        }
    } catch (error) {
        console.log("Error syncing app icon:", error);
    }
};
