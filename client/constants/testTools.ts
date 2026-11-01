import { Platform } from "react-native";

// Test tools (fake date, user reset): dev, preview and closed-testing builds only,
// see EXPO_PUBLIC_TEST_TOOLS_ENABLED in eas.json. Not available on the PWA.
export const TEST_TOOLS_ENABLED =
    Platform.OS !== "web" &&
    (__DEV__ || process.env.EXPO_PUBLIC_TEST_TOOLS_ENABLED === "true");
