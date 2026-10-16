import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { renderCountdownWidget } from "@/widgets/renderCountdownWidget";
import { readWidgetState } from "@/widgets/widgetState";

// Runs headless (app possibly closed) whenever Android asks the widget to redraw:
// when added, every updatePeriodMillis (see app.json) and on resize.
export const widgetTaskHandler = async ({
    widgetInfo,
    widgetAction,
    renderWidget,
}: WidgetTaskHandlerProps): Promise<void> => {
    switch (widgetAction) {
        case "WIDGET_ADDED":
        case "WIDGET_UPDATE":
        case "WIDGET_RESIZED":
            renderWidget(
                renderCountdownWidget(widgetInfo, await readWidgetState()),
            );
            break;
        default:
            break;
    }
};
