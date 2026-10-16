import { Image, ImageRequireSource } from "react-native";
import { Colors } from "@/constants/Colors";
import { WidgetCountdown } from "@/widgets/getWidgetCountdown";

// Shared by every home screen widget design.

export interface CountdownWidgetProps {
    countdown: WidgetCountdown;
    // Widget size in dp, so the content follows the user's resizing.
    width: number;
    height: number;
}

// Font file basename (without extension), copied into the APK
// by the react-native-android-widget config plugin (see app.json).
export const WIDGET_FONT_BOLD = "FreightNeo W03 Bold";
export const WIDGET_FONT_SEMI = "FreightNeo W03 Semi";

export const WIDGET_TEXT_COLOR = Colors.snow as `#${string}`;

// Props, not style: in dp rather than sp, as the widget has a fixed size
// and the system font scale would only make the text overflow and get clipped.
export const WIDGET_TEXT_PROPS = { allowFontScaling: false, maxLines: 1 };

// FreightNeo metrics, in em, measured on the font files.
const FONT_METRICS = {
    // A single-line TextView is always as tall as the font's ascent +
    // descent (hhea 1006 / -299), whatever `lineHeight`.
    lineBox: 1.305,
    // Average character width, to fit a word on one line.
    charWidth: 0.5,
    // Where the visible glyphs start, from the line box's top:
    // old-style digits (2, 3, 4…) are lower than capitals.
    digitsTop: 0.51,
    capsTop: 0.37,
    // Empty space under letters without descenders, above the box's bottom.
    lettersBottomGap: 0.284,
};

// Share of the previous line's font size by which a line is pulled up over
// that line's descent, empty for these words. Old-style digits (3, 4, 5, 7, 9)
// dip below the baseline, hence a smaller overlap under a number.
const WORD_OVERLAP = 0.25;
export const NUMBER_OVERLAP = 0.1;

// The largest font size (capped at maxSize) for which `text` fits on one line in `width`.
export const fitFontSize = (
    text: string,
    width: number,
    maxSize: number,
): number =>
    Math.round(
        Math.min(maxSize, width / (text.length * FONT_METRICS.charWidth)),
    );

export interface TextStack {
    fontSizes: number[];
    // Pulls each line up over the previous one (see the overlaps).
    marginsTop: number[];
    // Empty top/bottom of the stack's line boxes: give the zone holding the
    // stack negative margins of these, so the *visible glyphs* are what's
    // centered in it, and that empty space may overflow onto its neighbours.
    bleedTop: number;
    bleedBottom: number;
}

// Lines stacked vertically (a single line works too), as big as possible up to `sizes`,
// with their visible glyphs fitting in `height`: all sizes shrink together when there isn't enough room.
export const fitTextStack = (
    sizes: number[],
    height: number,
    {
        overlaps = [],
        startsWithNumber = false,
    }: {
        // overlaps[i]: how much line i+1 overlaps line i (default WORD_OVERLAP).
        overlaps?: number[];
        startsWithNumber?: boolean;
    } = {},
): TextStack => {
    if (sizes.length === 0) {
        return { fontSizes: [], marginsTop: [], bleedTop: 0, bleedBottom: 0 };
    }
    const { lineBox, digitsTop, capsTop, lettersBottomGap } = FONT_METRICS;
    const topShare = startsWithNumber ? digitsTop : capsTop;
    const overlapAbove = (index: number): number =>
        index > 0 ? (overlaps[index - 1] ?? WORD_OVERLAP) : 0;
    const last = sizes.length - 1;

    // Glyphs height = line boxes - overlaps - empty top and bottom.
    const glyphsHeight = sizes.reduce(
        (total, size, index) =>
            total +
            size * lineBox -
            (index > 0 ? sizes[index - 1] * overlapAbove(index) : 0),
        -sizes[0] * topShare - sizes[last] * lettersBottomGap,
    );
    const scale = Math.min(1, height / glyphsHeight);
    const fontSizes = sizes.map((size) => Math.floor(size * scale));

    return {
        fontSizes,
        marginsTop: fontSizes.map((_, index) =>
            index > 0
                ? -Math.round(fontSizes[index - 1] * overlapAbove(index))
                : 0,
        ),
        bleedTop: Math.round(fontSizes[0] * topShare),
        bleedBottom: Math.round(fontSizes[last] * lettersBottomGap),
    };
};

// Pixel size of a bundled image, read from the asset itself so the layout
// follows a replaced image without updating any constant.
// Image.resolveAssetSource only exists on native: the widgets are never
// rendered on web, but their modules are still bundled (and run) there,
// so it must not throw.
export const getImageSize = (
    source: ImageRequireSource,
): { width: number; height: number } => {
    const { width, height } = Image.resolveAssetSource?.(source) ?? {
        width: 0,
        height: 0,
    };
    return { width, height };
};

// Tap action of a widget: opens the app, or the premium screen (deep link,
// see "scheme" in app.json) when the widget is locked.
const PREMIUM_SCREEN_URI = "mon-calendrier-de-l-avent://informations/premium";

export const getWidgetClickProps = (
    countdown: WidgetCountdown,
): { clickAction: string; clickActionData?: { uri: string } } =>
    countdown.kind === "locked"
        ? {
              clickAction: "OPEN_URI",
              clickActionData: { uri: PREMIUM_SCREEN_URI },
          }
        : { clickAction: "OPEN_APP" };

export const getNightsLabel = (nights: number): string =>
    nights > 1 ? "nuits" : "nuit";
