import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Platform, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useReducedMotion,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { DayNumber } from "@/components/days/Button/DayNumber";
import { DayContent } from "@/components/days/Content/DayContent";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { Day } from "@/interfaces/dayInterface";

// A slow network must not leave the calendar frozen:
// past this, the door opens on the cell's dark background.
const MAX_IMAGE_WAIT = 1500;
const DOOR_DURATION = 550;
// Leaves a moment to see the cat through the open door.
const PEEK_DURATION = 500;
const EXPAND_DURATION = 500;
// The real day screen slides in behind the overlay during this delay.
const SWAP_DELAY = 400;
// A slow network or a loading error must not leave the overlay stuck.
const MAX_SWAP_WAIT = 1500;
const FADE_DURATION = 200;
const DOOR_OPEN_ANGLE = -90;

export interface DayCellRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface DayRevealRequest {
    day: Day;
    imageUrl: string;
    cell: DayCellRect;
    // Calendar screen size: the page stops above the tab bar, like the real one.
    page: { width: number; height: number };
    // Called once the page hides the app, so navigation happens out of sight.
    onCovered: () => void;
}

let listener: ((request: DayRevealRequest) => void) | null = null;

export function showDayReveal(request: DayRevealRequest): void {
    if (listener) {
        listener(request);
    } else {
        request.onCovered();
    }
}

let pageReadyListener: (() => void) | null = null;

// Called by the real day screen once painted: fading the copy away any sooner
// shows the blank background of a page whose images are still loading.
export function notifyDayPageReady(): void {
    pageReadyListener?.();
}

const wait = (duration: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, duration));

// react-native-web always resolves true, whether a screen reader runs or not.
const isScreenReaderOn = async (): Promise<boolean> =>
    Platform.OS !== "web" && AccessibilityInfo.isScreenReaderEnabled();

// Lives above the navigator: the reveal starts on the calendar and must stay
// on screen while the day screen is pushed behind it.
export function DayRevealHost(): React.JSX.Element | null {
    const [request, setRequest] = useState<DayRevealRequest | null>(null);

    useEffect(() => {
        listener = (next) => {
            isScreenReaderOn()
                .catch(() => false)
                .then((screenReaderOn) => {
                    if (screenReaderOn) {
                        next.onCovered();
                    } else {
                        setRequest(next);
                    }
                });
        };
        return () => {
            listener = null;
        };
    }, []);

    if (!request) return null;

    return (
        <DayRevealOverlay
            key={request.day.dayNumber}
            request={request}
            onDone={() => setRequest(null)}
        />
    );
}

interface DayRevealOverlayProps {
    request: DayRevealRequest;
    onDone: () => void;
}

function DayRevealOverlay({
    request: { day, imageUrl, cell, page, onCovered },
    onDone,
}: Readonly<DayRevealOverlayProps>): React.JSX.Element {
    const reduceMotion = useReducedMotion();

    const door = useSharedValue(0);
    const expand = useSharedValue(reduceMotion ? 1 : 0);
    const appear = useSharedValue(reduceMotion ? 0 : 1);
    const fade = useSharedValue(0);

    const [isPageInteractive, setIsPageInteractive] = useState(false);
    const hasStarted = useRef(false);
    const isLeaving = useRef(false);
    const imageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const leave = (): void => {
        if (isLeaving.current) return;
        isLeaving.current = true;
        pageReadyListener = null;
        fade.value = withTiming(1, { duration: FADE_DURATION }, (finished) => {
            if (finished) scheduleOnRN(onDone);
        });
    };

    const onFullyCovered = (): void => {
        // October lands on content screens, which never send this signal.
        const pageReady = isOctober
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                  pageReadyListener = resolve;
              });

        onCovered();
        // The page looks finished from now on, so its copy has to respond:
        // its buttons open the same content screens as the real ones.
        setIsPageInteractive(true);

        Promise.race([
            Promise.all([pageReady, wait(SWAP_DELAY)]),
            wait(MAX_SWAP_WAIT),
        ]).then(leave);
    };

    const startOpening = (): void => {
        if (hasStarted.current) return;
        hasStarted.current = true;
        if (imageTimer.current) clearTimeout(imageTimer.current);

        door.value = withTiming(1, {
            duration: DOOR_DURATION,
            easing: Easing.inOut(Easing.cubic),
        });
        expand.value = withDelay(
            DOOR_DURATION + PEEK_DURATION,
            withTiming(
                1,
                {
                    duration: EXPAND_DURATION,
                    easing: Easing.inOut(Easing.cubic),
                },
                (finished) => {
                    if (finished) scheduleOnRN(onFullyCovered);
                },
            ),
        );
    };

    useEffect(() => {
        if (reduceMotion) {
            appear.value = withTiming(
                1,
                { duration: FADE_DURATION },
                (finished) => {
                    if (finished) scheduleOnRN(onFullyCovered);
                },
            );
        } else {
            // The closed door looks like the cell: the image loads behind it.
            imageTimer.current = setTimeout(startOpening, MAX_IMAGE_WAIT);
        }

        return () => {
            if (imageTimer.current) clearTimeout(imageTimer.current);
        };
        // Runs once per reveal: the overlay is keyed and remounted for each day.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: 1 - fade.value,
    }));

    const doorStyle = useAnimatedStyle(() => ({
        // Android ignores where the perspective is anchored, so an edge-on door
        // can stay visible as a thin strip: the end of the swing hides it.
        opacity: interpolate(
            door.value,
            [0.95, 1],
            [1, 0],
            Extrapolation.CLAMP,
        ),
        // The two translations move the pivot from the center to the left edge.
        transform: [
            { perspective: 800 },
            { translateX: -cell.width / 2 },
            { rotateY: `${door.value * DOOR_OPEN_ANGLE}deg` },
            { translateX: cell.width / 2 },
        ],
    }));

    // Transforms only: the page stays laid out at its final size and is briefly
    // stretched to the cell's ratio, so nothing is re-laid out on each frame.
    const pageStyle = useAnimatedStyle(() => ({
        opacity:
            appear.value *
            interpolate(expand.value, [0, 0.2], [0, 1], Extrapolation.CLAMP),
        transform: [
            {
                translateX: interpolate(
                    expand.value,
                    [0, 1],
                    [cell.x + cell.width / 2 - page.width / 2, 0],
                ),
            },
            {
                translateY: interpolate(
                    expand.value,
                    [0, 1],
                    [cell.y + cell.height / 2 - page.height / 2, 0],
                ),
            },
            {
                scaleX: interpolate(
                    expand.value,
                    [0, 1],
                    [cell.width / page.width, 1],
                ),
            },
            {
                scaleY: interpolate(
                    expand.value,
                    [0, 1],
                    [cell.height / page.height, 1],
                ),
            },
        ],
    }));

    return (
        <Animated.View
            style={[styles.overlay, overlayStyle]}
            // Android otherwise fades each child on its own: the cat and the
            // page's white background then show through as a flash. Only costs
            // an offscreen pass while the opacity is below 1.
            needsOffscreenAlphaCompositing
            // Blocks the calendar behind, and hides this copy of the page from
            // screen readers: the real one takes over a moment later.
            onStartShouldSetResponder={() => true}
            aria-hidden
        >
            {!reduceMotion && (
                <>
                    <View
                        style={[
                            styles.catWindow,
                            {
                                left: cell.x,
                                top: cell.y,
                                width: cell.width,
                                height: cell.height,
                            },
                        ]}
                    >
                        <Image
                            source={{ uri: imageUrl }}
                            style={StyleSheet.absoluteFill}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                            onLoad={startOpening}
                            onError={startOpening}
                        />
                    </View>

                    <Animated.View
                        style={[
                            styles.door,
                            {
                                left: cell.x,
                                top: cell.y,
                                width: cell.width,
                                height: cell.height,
                                backgroundColor: day.color,
                            },
                            doorStyle,
                        ]}
                    >
                        <DayNumber day={day} dayIsOpen={false} />
                    </Animated.View>
                </>
            )}

            <Animated.View
                pointerEvents={isPageInteractive ? "auto" : "none"}
                onTouchEnd={leave}
                needsOffscreenAlphaCompositing
                style={[
                    styles.page,
                    { width: page.width, height: page.height },
                    pageStyle,
                ]}
            >
                {/* October lands on a content screen, not on the day page. */}
                {!isOctober && <DayContent dayId={day.dayNumber} />}
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9000,
    },
    catWindow: {
        position: "absolute",
        overflow: "hidden",
        backgroundColor: Theme.deep,
    },
    door: {
        position: "absolute",
        overflow: "hidden",
        justifyContent: "flex-end",
    },
    page: {
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: Colors.snow,
    },
});
