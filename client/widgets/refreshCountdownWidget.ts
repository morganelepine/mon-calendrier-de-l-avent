import { Platform } from "react-native";
import { requestWidgetUpdate } from "react-native-android-widget";
import { ChristmasTargetDay } from "@/enums/enums";
import { logClient } from "@/services/log.service";
import {
    renderCountdownWidget,
    WIDGET_NAMES,
} from "@/widgets/renderCountdownWidget";

// Redraws every countdown widget on the home screen,
// e.g. right after the user changes the target day in Settings.
export const refreshCountdownWidget = (targetDay: ChristmasTargetDay): void => {
    if (Platform.OS !== "android") return;

    WIDGET_NAMES.forEach((widgetName) => {
        requestWidgetUpdate({
            widgetName,
            renderWidget: (widgetInfo) =>
                renderCountdownWidget(widgetInfo, targetDay),
        }).catch((error) => {
            console.error("Error refreshing countdown widget", error);
            logClient("Error refreshing countdown widget", {
                widgetName,
                error: String(error),
            });
        });
    });
};
