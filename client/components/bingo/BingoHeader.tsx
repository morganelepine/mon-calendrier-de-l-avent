import { useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

interface BingoHeaderProps {
    generateBingoGrid: () => void;
}

export const BingoHeader: React.FC<BingoHeaderProps> = ({
    generateBingoGrid,
}) => {
    const iconSpinAnim = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(iconSpinAnim, {
                toValue: 1, // 360° rotation
                duration: 500, // ms
                useNativeDriver: true,
            }),
            Animated.timing(iconSpinAnim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }),
        ]).start();

        generateBingoGrid();
    };

    const spin = iconSpinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.header}>
            <ThemedText style={styles.title}>
                Le bingo des téléfilms de Noël
            </ThemedText>
            <Pressable onPress={handlePress} style={styles.button}>
                <View style={styles.buttonBackground} />
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <Ionicons
                        name="sync-outline"
                        size={30}
                        color={Colors.green}
                    />
                </Animated.View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        marginHorizontal: 20,
    },
    title: {
        flex: 1,
        color: Colors.snow,
        textAlign: "left",
        fontSize: 28,
        fontFamily: "PallyBold",
        letterSpacing: 2,
        lineHeight: 34,
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.snow,
        borderRadius: 50,
    },
    button: {
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
    },
});
