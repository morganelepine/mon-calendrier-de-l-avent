import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { readChristmasTargetDay } from "@/utils/christmasTargetDay";
import { renderCountdownWidget } from "@/widgets/renderCountdownWidget";

// Runs headless (app possibly closed) whenever Android asks the widget to redraw:
// when added, every updatePeriodMillis (see app.json) and on resize.
// Tapping it just opens the app (clickAction="OPEN_APP"), nothing to handle.
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
                renderCountdownWidget(
                    widgetInfo,
                    await readChristmasTargetDay(),
                ),
            );
            break;
        default:
            break;
    }
};
