import React from "react";
import { StyleSheet, View, Pressable } from "react-native";

interface CloseModalButtonProps {
    onPress: () => void;
    style: {};
    children?: React.ReactNode;
}

export const CloseModalButton: React.FC<CloseModalButtonProps> = ({
    onPress,
    style,
    children,
}) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <View style={{ ...styles.buttonBackground, ...style }} />
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        top: 30,
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
