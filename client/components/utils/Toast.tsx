import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export type ToastDuration = "short" | "long";

const DURATIONS: Record<ToastDuration, number> = {
    short: 1800,
    long: 3500,
};

type ToastListener = (message: string, duration: ToastDuration) => void;

let listener: ToastListener | null = null;

export function showToast(message: string, duration: ToastDuration = "short") {
    listener?.(message, duration);
}

export function ToastHost() {
    const insets = useSafeAreaInsets();
    const [message, setMessage] = useState<string | null>(null);
    const opacity = useRef(new Animated.Value(0)).current;
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        listener = (nextMessage, duration) => {
            if (hideTimer.current) clearTimeout(hideTimer.current);

            setMessage(nextMessage);
            Animated.timing(opacity, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();

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
    }, [opacity]);

    if (!message) return null;

    return (
        <Animated.View
            pointerEvents="none"
            style={[styles.container, { bottom: insets.bottom + 28, opacity }]}
        >
            <Text style={styles.text}>{message}</Text>
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
    text: {
        backgroundColor: "rgba(0,0,0,0.8)",
        color: Colors.snow,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 14,
        lineHeight: 20,
        textAlign: "center",
        overflow: "hidden",
        fontFamily: "Poppins",
    },
});
