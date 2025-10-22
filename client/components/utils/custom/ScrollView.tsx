import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, ScrollView, StyleProp, ViewStyle } from "react-native";

interface CustomScrollViewProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const CustomScrollView: React.FC<CustomScrollViewProps> = ({
    children,
    style,
}) => {
    return (
        <ScrollView
            persistentScrollbar={true} // Android only
            style={[styles.container, style]}
        >
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        minWidth: "100%",
        backgroundColor: Colors.snow,
    },
});
