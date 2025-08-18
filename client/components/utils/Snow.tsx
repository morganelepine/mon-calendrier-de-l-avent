import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
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
    const translateY = useRef(new Animated.Value(-size)).current;
    const initialDelay = Math.random() * duration;

    useEffect(() => {
        // Animation de chute
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: Dimensions.get("window").height + size,
                    duration: duration,
                    delay: initialDelay,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -size,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [translateY, size, duration]);

    return (
        <Animated.View
            style={[
                styles.snowflake,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: Colors.snow,
                    transform: [{ translateY }, { translateX: startX }],
                },
            ]}
        />
    );
};

export const Snowfall: React.FC<SnowfallProps> = ({ count }) => {
    const { width } = Dimensions.get("window");

    const snowflakes = Array.from({ length: count }, (_, index) => ({
        key: index,
        size: Math.random() * 5 + 2,
        startX: Math.random() * width - 20,
        duration: Math.random() * 7000 + 7000,
    }));

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
