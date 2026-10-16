import { Platform } from "react-native";
import { requestWidgetUpdate } from "react-native-android-widget";
import { logClient } from "@/services/log.service";
import {
    renderCountdownWidget,
    WIDGET_NAMES,
} from "@/widgets/renderCountdownWidget";
import { readWidgetState, WidgetState } from "@/widgets/widgetState";

// Redraws every countdown widget on the home screen,
// e.g. right after the user changes the target day in Settings or buys La Hotte Magique.
// overrides: values just changed, which AsyncStorage may not hold yet; the rest is read from it.
export const refreshCountdownWidget = async (
    overrides: Partial<WidgetState> = {},
): Promise<void> => {
    if (Platform.OS !== "android") return;

    const state = { ...(await readWidgetState()), ...overrides };

    WIDGET_NAMES.forEach((widgetName) => {
        requestWidgetUpdate({
            widgetName,
            renderWidget: (widgetInfo) =>
                renderCountdownWidget(widgetInfo, state),
        }).catch((error) => {
            console.error("Error refreshing countdown widget", error);
            logClient("Error refreshing countdown widget", {
                widgetName,
                error: String(error),
            });
        });
    });
};
