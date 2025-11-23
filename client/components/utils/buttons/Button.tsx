import { StyleSheet, ViewStyle, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface CustomButtonProps {
    children?: React.ReactNode;
    style?: ViewStyle;
    disabled?: boolean;
    onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    style = {},
    disabled,
    onPress,
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                style,
                disabled && styles.disabledButton,
                pressed && !disabled && styles.pressedButton,
            ]}
        >
            <ThemedText
                style={[
                    styles.buttonText,
                    disabled && { color: Colors.disabledText },
                ]}
            >
                {children}
            </ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        paddingHorizontal: 28,
        minHeight: 48,
        justifyContent: "center",
        backgroundColor: Colors.green,
    },
    buttonText: {
        color: Colors.snow,
        textAlign: "center",
    },
    disabledButton: {
        backgroundColor: Colors.disabled,
    },
    pressedButton: {
        opacity: 0.8,
    },
});
