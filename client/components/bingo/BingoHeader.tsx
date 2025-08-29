import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

interface BingoHeaderProps {
    generateBingoGrid: () => void;
    setModalVisible: (modalVisible: boolean) => void;
}

export const BingoHeader: React.FC<BingoHeaderProps> = ({
    generateBingoGrid,
    setModalVisible,
}) => {
    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.button}
            >
                <ThemedText type="italic14" style={styles.buttonText}>
                    Voir les règles
                </ThemedText>
            </Pressable>

            <Pressable onPress={generateBingoGrid} style={styles.button}>
                <ThemedText type="italic14" style={styles.buttonText}>
                    Générer une nouvelle grille
                </ThemedText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        width: "100%",
        gap: 16,
    },
    button: {
        height: 48,
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.snow,
        textDecorationLine: "underline",
    },
});
