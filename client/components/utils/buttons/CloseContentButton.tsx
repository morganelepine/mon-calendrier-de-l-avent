import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CloseContentButtonProps {
    onPress: () => void;
    style: {};
    children?: React.ReactNode;
}

export const CloseContentButton: React.FC<CloseContentButtonProps> = ({
    onPress,
    style,
    children,
}) => {
    const insets = useSafeAreaInsets();
    return (
        <Pressable
            onPress={onPress}
            style={[styles.button, { top: insets.top + 10 }]}
        >
            <View style={{ ...styles.buttonBackground, ...style }} />
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        right: 20,
        zIndex: 1,
        height: 48,
        width: 48,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
        borderRadius: 50,
    },
});
