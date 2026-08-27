import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface Game2048FooterProps {
    isNewBest: boolean | null;
    startNewGame: () => void;
}

export const Game2048Footer = ({
    isNewBest,
    startNewGame,
}: Game2048FooterProps) => {
    return (
        <View style={styles.gameOverBanner}>
            <ThemedText style={styles.gameOverText}>Partie terminée</ThemedText>
            {isNewBest && (
                <ThemedText style={styles.gameOverSubText}>
                    Nouveau record du jour ! Félicitations !
                </ThemedText>
            )}
            <Pressable style={styles.replayButton} onPress={startNewGame}>
                <ThemedText style={styles.replayButtonText}>Rejouer</ThemedText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    gameOverBanner: {
        backgroundColor: Colors.snow,
        alignItems: "center",
        paddingVertical: 16,
        gap: 8,
    },
    gameOverText: {
        fontSize: 18,
        fontFamily: "PallyBold",
        color: Colors.autumnGreen,
        letterSpacing: 2,
    },
    gameOverSubText: {
        fontSize: 14,
        color: Colors.autumnGreen,
    },
    replayButton: {
        backgroundColor: Colors.autumnGreen,
        paddingVertical: 4,
        paddingHorizontal: 24,
        borderRadius: 50,
    },
    replayButtonText: {
        color: Colors.snow,
    },
});
