import React from "react";
import {
    StyleSheet,
    View,
    Pressable,
    StyleProp,
    ViewStyle,
} from "react-native";

interface CloseContentButtonProps {
    onPress: () => void;
    style: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const CloseContentButton: React.FC<CloseContentButtonProps> = ({
    onPress,
    style,
    children,
}) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <View style={[styles.buttonBackground, style]} />
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        // position: "absolute",
        // right: 20,
        // zIndex: 1,
        // height: 48,
        // width: 48,
        // alignSelf: "center",
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
        borderRadius: 50,
    },
});
