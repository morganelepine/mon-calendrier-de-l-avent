// react-native-safe-area-context gotcha: passing edges={["top"]} does NOT
// exclude the other edges — an edge missing from the array falls through to
// the same "additive" behavior as if it had been listed (see
// node_modules/react-native-safe-area-context/src/SafeAreaView.web.tsx,
// getEdgeValue's switch has no case for `undefined`, only 'off' truly skips
// an edge). Every edge must be explicit, or insets you didn't ask for leak
// in - e.g. insets.bottom silently padding the bottom of a top-only header.

export const TOP_EDGES = {
    top: "additive",
    bottom: "off",
    left: "off",
    right: "off",
} as const;

export const TOP_BOTTOM_EDGES = {
    top: "additive",
    bottom: "additive",
    left: "off",
    right: "off",
} as const;

// For content that sits below a ScreenHeader (which already pads for
// insets.top itself) - top must be "off" here or the real inset gets
// counted twice: once by the header, once by this wrapper. Left/right stay
// additive since nothing else claims them (moot in this portrait-only app,
// but correct if that ever changes).
export const NO_TOP_EDGES = {
    top: "off",
    bottom: "additive",
    left: "additive",
    right: "additive",
} as const;
