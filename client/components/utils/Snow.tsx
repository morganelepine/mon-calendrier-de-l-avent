import React, { useEffect, useMemo, useRef } from "react";
import { StyleSheet, View, Animated, Dimensions, Easing } from "react-native";
import { Colors } from "@/constants/Colors";

interface SnowflakeProps {
    size: number;
    startX: number;
    duration: number;
}

interface SnowfallProps {
    count: number;
}

const Snowflake: React.FC<SnowflakeProps> = ({ size, startX, duration }) => {
    const { height } = Dimensions.get("window");
    const fallDistance = height + 2 * size;
    // Random starting position so that the screen is already filled when it opens
    const startY = useRef(Math.random() * fallDistance - size).current;
    // Initial value at the top: Animated.loop resets to it before each iteration
    const translateY = useRef(new Animated.Value(-size)).current;

    useEffect(() => {
        let animation: Animated.CompositeAnimation;

        translateY.setValue(startY);

        // First partial fall, at the same speed as the following ones
        animation = Animated.timing(translateY, {
            toValue: height + size,
            duration: (duration * (height + size - startY)) / fallDistance,
            useNativeDriver: true,
        });
        animation.start(({ finished }) => {
            if (!finished) return;
            translateY.setValue(-size);
            // Fall animation
            animation = Animated.loop(
                Animated.sequence([
                    Animated.timing(translateY, {
                        toValue: height + size,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateY, {
                        toValue: -size,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ]),
            );
            animation.start();
        });

        return () => animation.stop();
    }, [translateY, size, duration, height, fallDistance, startY]);

    // Horizontal sway: random amplitude (sign = direction) and period per flake
    const sway = useRef(new Animated.Value(0)).current;
    const swayAmplitude = useRef(
        (Math.random() * 10 + 5) * (Math.random() < 0.5 ? -1 : 1),
    ).current;
    const swayPeriod = useRef(Math.random() * 3000 + 3000).current;
    const translateX = useMemo(
        () => Animated.add(sway, startX),
        [sway, startX],
    );

    useEffect(() => {
        // 0 → +A → -A → 0, eased to approximate a sine wave
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(sway, {
                    toValue: swayAmplitude,
                    duration: swayPeriod / 4,
                    easing: Easing.out(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(sway, {
                    toValue: -swayAmplitude,
                    duration: swayPeriod / 2,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(sway, {
                    toValue: 0,
                    duration: swayPeriod / 4,
                    easing: Easing.in(Easing.sin),
                    useNativeDriver: true,
                }),
            ]),
        );
        animation.start();

        return () => animation.stop();
    }, [sway, swayAmplitude, swayPeriod]);

    return (
        <Animated.View
            style={[
                styles.snowflake,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: Colors.snow,
                    transform: [{ translateY }, { translateX }],
                },
            ]}
        />
    );
};

export const Snowfall: React.FC<SnowfallProps> = ({ count }) => {
    const { width } = Dimensions.get("window");

    const snowflakes = useMemo(
        () =>
            Array.from({ length: count }, (_, index) => ({
                key: index,
                size: Math.random() * 5 + 3,
                startX: Math.random() * width - 20,
                duration: Math.random() * 10000 + 10000,
            })),
        [count, width],
    );

    return (
        <View style={StyleSheet.absoluteFill}>
            {snowflakes.map(({ key, size, startX, duration }) => (
                <Snowflake
                    key={key}
                    size={size}
                    startX={startX}
                    duration={duration}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    snowflake: {
        position: "absolute",
    },
});
