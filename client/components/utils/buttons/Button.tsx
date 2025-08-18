import { StyleSheet, TextStyle, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface CustomButtonProps {
    children?: React.ReactNode;
    style?: TextStyle;
    onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    style = {},
    onPress,
}) => {
    return (
        <Pressable onPress={onPress} style={{ ...styles.button, ...style }}>
            <ThemedText style={styles.buttonText}>{children}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        paddingHorizontal: 20,
        minHeight: 48,
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});
