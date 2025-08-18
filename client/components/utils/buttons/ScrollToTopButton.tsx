import {
    StyleSheet,
    TextStyle,
    Pressable,
    Text,
    ScrollView,
    View,
} from "react-native";
import { forwardRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ScrollToTopButtonProps {
    children?: React.ReactNode;
    style?: TextStyle;
}

export const ScrollToTopButton = forwardRef<ScrollView, ScrollToTopButtonProps>(
    function ScrollToTopButton({ children, style = {} }, ref) {
        const scrollToTop = () => {
            if (ref && "current" in ref && ref.current) {
                ref.current.scrollTo({ y: 0, animated: true });
            }
        };

        return (
            <Pressable
                onPress={scrollToTop}
                style={{ ...styles.button, ...style }}
            >
                <View style={styles.buttonBackground} />
                <Text style={styles.buttonText}>
                    {children}
                    <Ionicons
                        name={"chevron-up-outline"}
                        size={25}
                        color={"white"}
                    />
                </Text>
            </Pressable>
        );
    }
);

const styles = StyleSheet.create({
    button: {
        padding: 6,
        alignSelf: "center",
        position: "absolute",
        bottom: 50,
        right: 10,
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "#d6ae72",
        borderRadius: 50,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 20,
    },
});
