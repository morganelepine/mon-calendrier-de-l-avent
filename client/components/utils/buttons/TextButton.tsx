import { StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Theme } from "@/constants/Colors";

interface TextButtonProps {
    children?: React.ReactNode;
    style?: ViewStyle;
    onPress: () => void;
    textColor?: string;
    accessibilityLabel?: string;
}

export const TextButton: React.FC<TextButtonProps> = ({
    children,
    style = {},
    onPress,
    textColor = Theme.tint,
    accessibilityLabel = "",
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            style={[styles.button, style]}
        >
            <ThemedText style={[styles.buttonText, { color: textColor }]}>
                {children}
            </ThemedText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 28,
    },
    buttonText: {
        fontFamily: "FreightNeo",
        fontSize: 14,
        lineHeight: 28,
        textAlign: "center",
        textDecorationLine: "underline",
    },
});
