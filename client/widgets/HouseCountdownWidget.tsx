// Widgets must stay plain functions (no hooks, no React Compiler memoization).
"use no memo";
import {
    FlexWidget,
    ImageWidget,
    OverlapWidget,
    TextWidget,
} from "react-native-android-widget";
import {
    CountdownWidgetProps,
    fitFontSize,
    fitTextStack,
    getImageSize,
    getNightsLabel,
    getWidgetClickProps,
    WIDGET_FONT_BOLD,
    WIDGET_FONT_SEMI,
    WIDGET_TEXT_COLOR,
    WIDGET_TEXT_PROPS,
} from "@/widgets/widgetCommon";

// Must match the "name" of the widget declared in app.json.
export const HOUSE_WIDGET_NAME = "HouseCountdown";

const HOUSE = require("@/assets/images/widget/widget_house.webp");
const IMAGE = getImageSize(HOUSE);
const HOUSES_HEIGHT = 413 / 400; // 413px for 400px wide
const IMAGE_BACKGROUND = "#b59878";

// Shares of the widget width.
const NUMBER_SIZE = 0.48;
const WORD_SIZE = 0.26;
const TEXT_WIDTH = 0.88;
const TEXT_ZONE_MARGIN = 0.03;
// Share of the zone's height the visible glyphs may fill: the text is sized
// to fill the zone (in the mini widget), up to the sizes above.
const TEXT_FILL = 0.6;
// How much each line overlaps the one above (share of its font size).
const NIGHTS_OVERLAPS = [0.2, 0.4, 0.35];
// Shown instead of the countdown without La Hotte Magique.
const LOCKED_LINES = ["Avec", "La Hotte", "Magique"];

// Tall (1x2) beige card, the image edge to edge and anchored at the bottom:
// "12 / nuits / avant / Noël" stacked above the houses, or "Joyeux / Noël" on the day itself.
// The image is meant to be taller than the widget:
// its top (sky) is cropped, so a taller widget just shows more snowy sky.
export const HouseCountdownWidget = ({
    countdown,
    width,
    height,
}: CountdownWidgetProps) => {
    const imageHeight = Math.round((IMAGE.height * width) / IMAGE.width);
    const radius = Math.round(Math.min(width * 0.18, 20));
    // Everything above the houses, minus a margin above and below.
    const margin = Math.round(width * TEXT_ZONE_MARGIN);
    const zoneHeight = Math.max(
        0,
        height - Math.round(width * HOUSES_HEIGHT) - 2 * margin,
    );

    const isNights = countdown.kind === "nights";
    const lines = isNights
        ? [
              String(countdown.nights),
              getNightsLabel(countdown.nights),
              "avant",
              "Noël",
          ]
        : countdown.kind === "greeting"
          ? countdown.lines
          : LOCKED_LINES;
    // A message's lines all get the size of its longest one.
    const messageSize = Math.min(
        ...lines.map((line) =>
            fitFontSize(line, width * TEXT_WIDTH, width * WORD_SIZE),
        ),
    );
    // As big as the zone allows (so the smallest widget gets the biggest text it can),
    // capped by these sizes and by the width.
    const { fontSizes, marginsTop, bleedTop, bleedBottom } = fitTextStack(
        lines.map((line, index) =>
            isNights && index === 0
                ? Math.round(width * NUMBER_SIZE)
                : isNights
                  ? fitFontSize(line, width * TEXT_WIDTH, width * WORD_SIZE)
                  : messageSize,
        ),
        Math.round(zoneHeight * TEXT_FILL),
        {
            overlaps: isNights ? NIGHTS_OVERLAPS : [],
            startsWithNumber: isNights,
        },
    );

    return (
        <OverlapWidget
            {...getWidgetClickProps(countdown)}
            accessibilityLabel={
                isNights
                    ? `${countdown.nights} ${getNightsLabel(countdown.nights)} avant Noël`
                    : countdown.message
            }
            style={{ height: "match_parent", width: "match_parent" }}
        >
            {/* No fragments here: the widget tree builder can't render them. */}
            <FlexWidget
                style={{
                    height: "match_parent",
                    width: "match_parent",
                    flexDirection: "column",
                    // A taller-than-widget image overflows upwards and
                    // gets clipped, keeping the houses at the bottom.
                    justifyContent: "flex-end",
                    backgroundColor: IMAGE_BACKGROUND,
                    borderRadius: radius,
                    overflow: "hidden",
                }}
            >
                <ImageWidget
                    image={HOUSE}
                    imageWidth={width}
                    imageHeight={imageHeight}
                    // Exact size, or Android would shrink it to fit.
                    style={{ width, height: imageHeight }}
                />
            </FlexWidget>
            <FlexWidget
                style={{
                    height: "match_parent",
                    width: "match_parent",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: margin,
                }}
            >
                <FlexWidget
                    style={{
                        width: "match_parent",
                        // Centers the visible glyphs (see fitTextStack).
                        marginTop: -bleedTop,
                        height: zoneHeight + bleedTop + bleedBottom,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {lines.map((line, index) => (
                        <TextWidget
                            key={index}
                            {...WIDGET_TEXT_PROPS}
                            text={line}
                            style={{
                                fontSize: fontSizes[index],
                                marginTop: marginsTop[index],
                                // Only the number in bold.
                                fontFamily:
                                    isNights && index === 0
                                        ? WIDGET_FONT_BOLD
                                        : WIDGET_FONT_SEMI,
                                color: WIDGET_TEXT_COLOR,
                                textAlign: "center",
                            }}
                        />
                    ))}
                </FlexWidget>
            </FlexWidget>
        </OverlapWidget>
    );
};
