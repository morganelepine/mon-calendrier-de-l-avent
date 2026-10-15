import "expo-router/entry";
import { Platform } from "react-native";
import { registerWidgetTaskHandler } from "react-native-android-widget";
import { widgetTaskHandler } from "@/widgets/widgetTaskHandler";

// Home screen widget (Android only): its headless task must be registered
// at the JS entry point, outside any component - see widgets/.
if (Platform.OS === "android") {
    registerWidgetTaskHandler(widgetTaskHandler);
}
