// Widgets must stay plain functions (no hooks, no React Compiler memoization).
"use no memo";
import {
    FlexWidget,
    ImageWidget,
    TextWidget,
} from "react-native-android-widget";
import { formatUnitLabel } from "@/components/calendar/Countdown/countdownUnits";
import {
    CountdownWidgetProps,
    fitFontSize,
    fitTextStack,
    getImageSize,
    NUMBER_OVERLAP,
    TextStack,
    WIDGET_FONT_BOLD,
    WIDGET_FONT_SEMI,
    WIDGET_TEXT_COLOR,
    WIDGET_TEXT_PROPS,
} from "@/widgets/widgetCommon";

// Must match the "name" of the widget declared in app.json.
export const GIFTS_WIDGET_NAME = "GiftsCountdown";

// Same width, on the widget's own blue-grey background, so they scale
// together and keep the gifts aligned. Their sizes are read from the files.
const TOP_GIFT = require("@/assets/images/widget/widget_gifts_top.webp");
const TOP_GIFT_SIZE = getImageSize(TOP_GIFT);
const BOTTOM_GIFTS = require("@/assets/images/widget/widget_gifts_bottom.webp");
const BOTTOM_GIFTS_SIZE = getImageSize(BOTTOM_GIFTS);
const BACKGROUND = "#97b6be";

// Shares of `base`, the design width (see below).
const PADDING = 0.04;
const IMAGE_WIDTH = 0.92;
// Text sizes when there's room to spare; shrunk to fit otherwise.
const NUMBER_SIZE = 0.36;
const LABEL_SIZE = 0.1;
// Room kept for the text's glyphs between the two images (they're ~0.36 at full size),
// gaps included: the images shrink below that, then the text shrinks to fit in it.
const TEXT_MIN_HEIGHT = 0.44;
// Minimum gap between the glyphs and each image.
const TEXT_GAP = 0.03;
// Share of the room for the glyphs (between the images, minus the gaps) they may fill at most.
const TEXT_FILL = 0.85;

// Only refreshed every 30 min by Android (updatePeriodMillis),
// so the hours can lag behind by up to that much.
const Unit = ({
    value,
    label,
    columnWidth,
    stack,
}: {
    value: number;
    label: string;
    columnWidth: number;
    // [number, label] sizes, from fitTextStack.
    stack: TextStack;
}) => (
    <FlexWidget
        style={{
            width: columnWidth,
            flexDirection: "column",
            alignItems: "center",
        }}
    >
        <TextWidget
            {...WIDGET_TEXT_PROPS}
            text={String(value)}
            style={{
                fontSize: stack.fontSizes[0],
                fontFamily: WIDGET_FONT_BOLD,
                color: WIDGET_TEXT_COLOR,
                textAlign: "center",
            }}
        />
        <TextWidget
            {...WIDGET_TEXT_PROPS}
            text={label.toUpperCase()}
            style={{
                fontSize: stack.fontSizes[1],
                marginTop: stack.marginsTop[1],
                letterSpacing: Math.round(stack.fontSizes[1] * 0.08),
                fontFamily: WIDGET_FONT_SEMI,
                color: WIDGET_TEXT_COLOR,
                textAlign: "center",
            }}
        />
    </FlexWidget>
);

// Tall (2x4) column: top gift, then "12 JOURS · 5 HEURES" (same units as the
// Columns countdown) or "Joyeux / Noël", then the two bottom gifts.
// The text takes all the height left between the images and is centered in
// it, so a taller widget only adds space around the text.
export const GiftsCountdownWidget = ({
    countdown,
    width,
    height,
}: CountdownWidgetProps) => {
    // Sized from the width, unless the widget is too short to fit both
    // images and the text: then everything shrinks together.
    const imagesHeight =
        IMAGE_WIDTH *
        (TOP_GIFT_SIZE.height / TOP_GIFT_SIZE.width +
            BOTTOM_GIFTS_SIZE.height / BOTTOM_GIFTS_SIZE.width);
    const base = Math.min(
        width,
        height / (2 * PADDING + imagesHeight + TEXT_MIN_HEIGHT),
    );
    const padding = Math.round(base * PADDING);
    const imageWidth = Math.round(base * IMAGE_WIDTH);
    const topHeight = Math.round(
        (imageWidth * TOP_GIFT_SIZE.height) / TOP_GIFT_SIZE.width,
    );
    const bottomHeight = Math.round(
        (imageWidth * BOTTOM_GIFTS_SIZE.height) / BOTTOM_GIFTS_SIZE.width,
    );
    // Actual room between the images (at least TEXT_MIN_HEIGHT * base).
    const textHeight = height - 2 * padding - topHeight - bottomHeight;
    const columnWidth = Math.round(base * 0.44);

    const isNights = countdown.kind === "nights";
    const glyphsHeight = Math.round(
        (textHeight - 2 * Math.round(base * TEXT_GAP)) * TEXT_FILL,
    );
    const unitStack = fitTextStack(
        [
            Math.round(base * NUMBER_SIZE),
            fitFontSize("HEURES", columnWidth * 0.8, base * LABEL_SIZE),
        ],
        glyphsHeight,
        { overlaps: [NUMBER_OVERLAP], startsWithNumber: true },
    );
    const greetingLines = isNights ? [] : [countdown.top, countdown.bottom];
    const greetingStack = fitTextStack(
        greetingLines.map((line) =>
            fitFontSize(line, base * 0.88, base * 0.17),
        ),
        glyphsHeight,
    );
    // The empty top/bottom of the text's line boxes may overlap the images,
    // so that the visible glyphs are what's centered between them.
    const { bleedTop, bleedBottom } = isNights ? unitStack : greetingStack;

    return (
        <FlexWidget
            clickAction="OPEN_APP"
            accessibilityLabel={
                isNights
                    ? `${countdown.days} ${formatUnitLabel(countdown.days, "jour", "jours")} et ${countdown.hours} ${formatUnitLabel(countdown.hours, "heure", "heures")} avant Noël`
                    : countdown.message
            }
            style={{
                height: "match_parent",
                width: "match_parent",
                flexDirection: "column",
                alignItems: "center",
                padding,
                backgroundColor: BACKGROUND,
                borderRadius: Math.round(Math.min(width * 0.12, 20)),
            }}
        >
            {/* No fragments here: the widget tree builder can't render them. */}
            <ImageWidget
                image={TOP_GIFT}
                imageWidth={imageWidth}
                imageHeight={topHeight}
            />
            <FlexWidget
                style={{
                    flex: 1,
                    width: "match_parent",
                    marginTop: -bleedTop,
                    marginBottom: -bleedBottom,
                    flexDirection: isNights ? "row" : "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {isNights && (
                    <Unit
                        value={countdown.days}
                        label={formatUnitLabel(countdown.days, "jour", "jours")}
                        columnWidth={columnWidth}
                        stack={unitStack}
                    />
                )}
                {isNights && (
                    <Unit
                        value={countdown.hours}
                        label={formatUnitLabel(
                            countdown.hours,
                            "heure",
                            "heures",
                        )}
                        columnWidth={columnWidth}
                        stack={unitStack}
                    />
                )}
                {greetingLines.map((line, index) => (
                    <TextWidget
                        key={line}
                        {...WIDGET_TEXT_PROPS}
                        text={line}
                        style={{
                            fontSize: greetingStack.fontSizes[index],
                            marginTop: greetingStack.marginsTop[index],
                            fontFamily: WIDGET_FONT_SEMI,
                            color: WIDGET_TEXT_COLOR,
                            textAlign: "center",
                        }}
                    />
                ))}
            </FlexWidget>
            <ImageWidget
                image={BOTTOM_GIFTS}
                imageWidth={imageWidth}
                imageHeight={bottomHeight}
            />
        </FlexWidget>
    );
};
