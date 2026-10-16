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
    getNightsLabel,
    getWidgetClickProps,
    WIDGET_FONT_BOLD,
    WIDGET_FONT_SEMI,
    WIDGET_TEXT_COLOR,
    WIDGET_TEXT_PROPS,
} from "@/widgets/widgetCommon";

// Must match the "name" of the widget declared in app.json.
export const SNOWBALL_WIDGET_NAME = "SnowballCountdown";

const SNOWBALL = require("@/assets/images/widget/widget_snowball.webp");
// Same image dimmed (see LOCKED_VEIL_COLOR), shown without La Hotte Magique.
const SNOWBALL_LOCKED = require("@/assets/images/widget/widget_snowball_locked.webp");
// widget_snowball.webp is a 600x600 square on a transparent background, with
// an empty green band at the bottom for the text. Band position in image pixels:
const IMAGE_SIZE = 600;
const BAND = { top: 475, height: 106, left: 14, width: 572 };
// The text's visible glyphs fill this share of the band's height at most, and 92% of its width.
const TEXT_FILL = 0.37;
const TEXT_WIDTH = 0.92;
// Shown instead of the countdown without La Hotte Magique.
const LOCKED_TEXT = "Débloquez La Hotte Magique";

// Snow globe (2x2) with "12 nuits avant Noël", or "Joyeux Noël" on the day itself, written on its green base.
export const SnowballCountdownWidget = ({
    countdown,
    width,
    height,
}: CountdownWidgetProps) => {
    // The image stays square and centered; a non-square widget just shows
    // more of the home screen around it (transparent background).
    const side = Math.min(width, height);
    const scale = side / IMAGE_SIZE;
    const bandWidth = Math.round(BAND.width * scale);
    const bandHeight = Math.round(BAND.height * scale);

    const isNights = countdown.kind === "nights";
    const text = isNights
        ? `${countdown.nights} ${getNightsLabel(countdown.nights)} avant Noël`
        : countdown.kind === "greeting"
          ? countdown.lines.join(" ")
          : LOCKED_TEXT;
    // One line, as big as the band allows: its height, or its width for long texts.
    const {
        fontSizes: [fontSize],
        bleedTop,
        bleedBottom,
    } = fitTextStack(
        [fitFontSize(text, bandWidth * TEXT_WIDTH, Infinity)],
        bandHeight * TEXT_FILL,
    );

    return (
        <FlexWidget
            {...getWidgetClickProps(countdown)}
            accessibilityLabel={isNights ? text : countdown.message}
            style={{
                height: "match_parent",
                width: "match_parent",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* No fragments here: the widget tree builder can't render them. */}
            <OverlapWidget style={{ width: side, height: side }}>
                <ImageWidget
                    image={
                        countdown.kind === "locked" ? SNOWBALL_LOCKED : SNOWBALL
                    }
                    imageWidth={side}
                    imageHeight={side}
                />
                <FlexWidget
                    style={{
                        width: side,
                        height: side,
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: Math.round(BAND.top * scale),
                    }}
                >
                    <FlexWidget
                        style={{
                            width: bandWidth,
                            // Centers the visible glyphs (see fitTextStack).
                            marginTop: -bleedTop,
                            height: bandHeight + bleedTop + bleedBottom,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* Only the number in bold: same size, so same baseline. */}
                        {isNights && (
                            <TextWidget
                                {...WIDGET_TEXT_PROPS}
                                text={String(countdown.nights)}
                                style={{
                                    fontSize,
                                    fontFamily: WIDGET_FONT_BOLD,
                                    color: WIDGET_TEXT_COLOR,
                                }}
                            />
                        )}
                        <TextWidget
                            {...WIDGET_TEXT_PROPS}
                            text={
                                isNights
                                    ? `${getNightsLabel(countdown.nights)} avant Noël`
                                    : text
                            }
                            style={{
                                fontSize,
                                // A space's width between the number and the words.
                                marginLeft: isNights
                                    ? Math.round(fontSize * 0.25)
                                    : 0,
                                fontFamily: WIDGET_FONT_SEMI,
                                color: WIDGET_TEXT_COLOR,
                            }}
                        />
                    </FlexWidget>
                </FlexWidget>
            </OverlapWidget>
        </FlexWidget>
    );
};
