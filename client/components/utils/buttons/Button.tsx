import {
    StyleSheet,
    ViewStyle,
    Pressable,
    ActivityIndicator,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";
import {
    pillButtonBase,
    pillButtonTextBase,
} from "@/components/utils/buttons/pillButtonStyles";

interface CustomButtonProps {
    children?: React.ReactNode;
    style?: ViewStyle;
    disabled?: boolean;
    onPress: () => void;
    color?: string;
    textColor?: string;
    loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    style = {},
    disabled,
    onPress,
    color = Theme.autumnGreenDarkToautumnGreen,
    textColor = Colors.snow,
    loading = false,
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            accessibilityRole="button"
            accessibilityState={{
                disabled: disabled || loading,
                busy: loading,
            }}
            style={({ pressed }) => [
                styles.button,
                style,
                { backgroundColor: color },
                disabled && !loading && styles.disabledButton,
                pressed && !disabled && !loading && styles.pressedButton,
            ]}
        >
            {/* The label stays rendered while loading so screen readers still announce it. */}
            <ThemedText
                style={[
                    styles.buttonText,
                    { color: textColor },
                    disabled && { color: Colors.disabledText },
                    loading && styles.hiddenText,
                ]}
            >
                {children}
            </ThemedText>
            {loading && (
                <ActivityIndicator
                    color={Colors.snow}
                    style={StyleSheet.absoluteFill}
                />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        ...pillButtonBase,
        borderWidth: 1,
        borderColor: Colors.snow,
    },
    buttonText: {
        ...pillButtonTextBase,
        paddingBottom: 5,
    },
    disabledButton: {
        backgroundColor: Colors.disabled,
    },
    pressedButton: {
        opacity: 0.8,
    },
    hiddenText: {
        opacity: 0,
    },
});
