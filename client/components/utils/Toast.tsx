import { useEffect, useRef, useState } from "react";
import {
    AccessibilityInfo,
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import {
    ConfettiBurst,
    CONFETTI_DURATION,
} from "@/components/utils/ConfettiBurst";

export type ToastDuration = "short" | "long";
type ToastVariant = "default" | "points";

const DURATIONS: Record<ToastDuration, number> = {
    short: 1800,
    long: 3700,
};
// A screen reader user needs time to swipe to the action before it disappears.
const SCREEN_READER_ACTION_DURATION = 10000;

export interface ToastAction {
    label: string;
    onPress: () => void;
}

type ToastListener = (
    message: string,
    duration: ToastDuration,
    variant: ToastVariant,
    action?: ToastAction,
) => void;

let listener: ToastListener | null = null;

export function showToast(
    message: string,
    duration: ToastDuration = "short",
    action?: ToastAction,
) {
    listener?.(message, duration, "default", action);
}

// Celebratory variant for point gains.
export function showPointsToast(points: number) {
    listener?.(`+${points} points`, "short", "points");
}

export function ToastHost() {
    const insets = useSafeAreaInsets();
    const [message, setMessage] = useState<string | null>(null);
    const [variant, setVariant] = useState<ToastVariant>("default");
    const [action, setAction] = useState<ToastAction | undefined>();
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const confetti = useRef(new Animated.Value(0)).current;
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isScreenReaderOn = useRef(false);

    useEffect(() => {
        AccessibilityInfo.isScreenReaderEnabled()
            .then((enabled) => {
                isScreenReaderOn.current = enabled;
            })
            .catch(() => {});
        const subscription = AccessibilityInfo.addEventListener(
            "screenReaderChanged",
            (enabled) => {
                isScreenReaderOn.current = enabled;
            },
        );
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        listener = (nextMessage, duration, nextVariant, nextAction) => {
            if (hideTimer.current) clearTimeout(hideTimer.current);

            setMessage(nextMessage);
            setVariant(nextVariant);
            setAction(nextAction);
            AccessibilityInfo.announceForAccessibility(
                nextAction
                    ? `${nextMessage}. Lien « ${nextAction.label} » disponible.`
                    : nextMessage,
            );

            if (nextVariant === "points") {
                scale.setValue(0.75);
                confetti.setValue(0);
                Animated.parallel([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.spring(scale, {
                        toValue: 1,
                        friction: 5,
                        tension: 140,
                        useNativeDriver: true,
                    }),
                    Animated.timing(confetti, {
                        toValue: 1,
                        duration: CONFETTI_DURATION,
                        useNativeDriver: true,
                    }),
                ]).start();
            } else {
                scale.setValue(1);
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }).start();
            }

            hideTimer.current = setTimeout(
                () => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => setMessage(null));
                },
                nextAction && isScreenReaderOn.current
                    ? SCREEN_READER_ACTION_DURATION
                    : DURATIONS[duration],
            );
        };

        return () => {
            listener = null;
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, [opacity, scale, confetti]);

    if (!message) return null;

    const isPoints = variant === "points";

    const onActionPress = () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        opacity.setValue(0);
        setMessage(null);
        action?.onPress();
    };

    return (
        <Animated.View
            // Only an action toast may catch touches; others must never block the screen.
            pointerEvents={action ? "box-none" : "none"}
            style={[
                styles.container,
                { bottom: insets.bottom + 28, opacity, transform: [{ scale }] },
            ]}
        >
            <View style={styles.pillWrapper}>
                {isPoints && <ConfettiBurst progress={confetti} />}
                <View style={[styles.pill, isPoints && styles.pointsPill]}>
                    <Text style={[styles.text, isPoints && styles.pointsText]}>
                        {message}
                    </Text>
                    {isPoints && (
                        <Ionicons
                            name="star"
                            size={12}
                            color={Colors.snow}
                            style={styles.pointsIcon}
                        />
                    )}
                    {action && (
                        <Pressable
                            onPress={onActionPress}
                            accessibilityRole="link"
                            hitSlop={10}
                        >
                            <Text style={[styles.text, styles.actionText]}>
                                {action.label}
                            </Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 24,
        right: 24,
        alignItems: "center",
        zIndex: 9999,
    },
    pillWrapper: {
        alignItems: "center",
    },
    pill: {
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 50,
        overflow: "hidden",
    },
    pointsPill: {
        flexDirection: "row",
        backgroundColor: Colors.gold,
    },
    pointsIcon: {
        marginLeft: 6,
    },
    actionText: {
        fontFamily: "PoppinsBold",
        color: Colors.gold,
        textDecorationLine: "underline",
    },
    text: {
        color: Colors.snow,
        fontSize: 14,
        lineHeight: 20,
        textAlign: "center",
        fontFamily: "Poppins",
    },
    pointsText: {
        color: Colors.snow,
        fontFamily: "FreightNeoBold",
        letterSpacing: 2,
    },
});
