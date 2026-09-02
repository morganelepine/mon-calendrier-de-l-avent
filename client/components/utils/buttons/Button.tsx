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
    color = Theme.autumnGreen,
    textColor = Colors.snow,
    loading = false,
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                style,
                { backgroundColor: color },
                disabled && !loading && styles.disabledButton,
                pressed && !disabled && !loading && styles.pressedButton,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={Colors.snow} />
            ) : (
                <ThemedText
                    style={[
                        styles.buttonText,
                        { color: textColor },
                        disabled && { color: Colors.disabledText },
                    ]}
                >
                    {children}
                </ThemedText>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        ...pillButtonBase,
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
});
