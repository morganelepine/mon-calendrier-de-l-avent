import type { WidgetInfo } from "react-native-android-widget";
import { ChristmasTargetDay } from "@/enums/enums";
import {
    GIFTS_WIDGET_NAME,
    GiftsCountdownWidget,
} from "@/widgets/GiftsCountdownWidget";
import {
    HOUSE_WIDGET_NAME,
    HouseCountdownWidget,
} from "@/widgets/HouseCountdownWidget";
import {
    SNOWBALL_WIDGET_NAME,
    SnowballCountdownWidget,
} from "@/widgets/SnowballCountdownWidget";
import { getWidgetCountdown } from "@/widgets/getWidgetCountdown";

// One component per widget declared in app.json, keyed by its "name".
const WIDGETS = {
    [HOUSE_WIDGET_NAME]: HouseCountdownWidget,
    [SNOWBALL_WIDGET_NAME]: SnowballCountdownWidget,
    [GIFTS_WIDGET_NAME]: GiftsCountdownWidget,
};

export const WIDGET_NAMES = Object.keys(WIDGETS);

export const renderCountdownWidget = (
    widgetInfo: WidgetInfo,
    targetDay: ChristmasTargetDay,
) => {
    const Widget =
        WIDGETS[widgetInfo.widgetName as keyof typeof WIDGETS] ??
        HouseCountdownWidget;

    return (
        <Widget
            countdown={getWidgetCountdown(targetDay)}
            width={widgetInfo.width}
            height={widgetInfo.height}
        />
    );
};
