import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

const STROKE = 2;

interface GarlandSwagProps {
    width: number;
    sag: number;
    isLinked: boolean;
}

// Sagging piece of string between two baubles, drawn without SVG:
// the visible bottom of a circle whose chord is `width` and depth is `sag`.
export const GarlandSwag: React.FC<GarlandSwagProps> = ({
    width,
    sag,
    isLinked,
}) => {
    const half = width / 2;
    const radius = (half * half + sag * sag) / (2 * sag);

    return (
        <View style={[styles.window, { width, height: sag + STROKE }]}>
            <View
                style={[
                    styles.circle,
                    isLinked && styles.linked,
                    {
                        width: radius * 2,
                        height: radius * 2,
                        borderRadius: radius,
                        left: half - radius,
                        top: sag + STROKE - radius * 2,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    window: {
        overflow: "hidden",
    },
    circle: {
        position: "absolute",
        borderWidth: STROKE,
        borderColor: Colors.disabled,
    },
    linked: {
        borderColor: Colors.blue,
    },
});
