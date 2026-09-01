import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { CustomButton } from "@/components/utils/buttons/Button";

interface Game2048FooterProps {
    startNewGame: () => void;
}

export const Game2048Footer = ({ startNewGame }: Game2048FooterProps) => {
    return (
        <View style={styles.gameOverBanner}>
            <ThemedText style={styles.gameOverText}>Partie terminée</ThemedText>
            <CustomButton onPress={startNewGame}>Rejouer</CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    gameOverBanner: {
        backgroundColor: Colors.snow,
        alignItems: "center",
        paddingVertical: 12,
        gap: 4,
        flexDirection: "row",
        justifyContent: "center",
    },
    gameOverText: {
        color: Colors.autumnGreen,
    },
});
