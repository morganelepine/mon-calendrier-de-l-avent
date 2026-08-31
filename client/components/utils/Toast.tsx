import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { ConfettiBurst, CONFETTI_DURATION } from "@/components/utils/ConfettiBurst";

export type ToastDuration = "short" | "long";
type ToastVariant = "default" | "points";

const DURATIONS: Record<ToastDuration, number> = {
    short: 1800,
    long: 3500,
};

type ToastListener = (
    message: string,
    duration: ToastDuration,
    variant: ToastVariant,
) => void;

let listener: ToastListener | null = null;

export function showToast(message: string, duration: ToastDuration = "short") {
    listener?.(message, duration, "default");
}

// Celebratory variant for point gains.
export function showPointsToast(points: number) {
    listener?.(`+${points} points`, "short", "points");
}

export function ToastHost() {
    const insets = useSafeAreaInsets();
    const [message, setMessage] = useState<string | null>(null);
    const [variant, setVariant] = useState<ToastVariant>("default");
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const confetti = useRef(new Animated.Value(0)).current;
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        listener = (nextMessage, duration, nextVariant) => {
            if (hideTimer.current) clearTimeout(hideTimer.current);

            setMessage(nextMessage);
            setVariant(nextVariant);

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

            hideTimer.current = setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => setMessage(null));
            }, DURATIONS[duration]);
        };

        return () => {
            listener = null;
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, [opacity, scale, confetti]);

    if (!message) return null;

    const isPoints = variant === "points";

    return (
        <Animated.View
            pointerEvents="none"
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
                            size={14}
                            color={Colors.snow}
                            style={styles.pointsIcon}
                        />
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
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 50,
        overflow: "hidden",
    },
    pointsPill: {
        backgroundColor: Colors.gold,
    },
    pointsIcon: {
        marginLeft: 6,
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
        fontFamily: "PallyBold",
        letterSpacing: 2,
    },
});
