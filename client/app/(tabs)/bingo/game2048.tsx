import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Game2048Board } from "@/components/games2048/Game2048Board";
import { ThemedText } from "@/components/ThemedText";
import { useGame2048 } from "@/hooks/useGame2048";
import { Colors, Theme } from "@/constants/Colors";

export default function Game2048Screen() {
    const {
        board,
        score,
        bestScore,
        status,
        hasWon,
        isNewBest,
        play,
        startNewGame,
    } = useGame2048();

    return (
        <SafeAreaView edges={["top"]} style={styles.container}>
            <View style={styles.header}>
                <View style={styles.scoresContainer}>
                    <View
                        style={[
                            styles.scoreContainer,
                            { backgroundColor: Colors.snow },
                        ]}
                    >
                        <ThemedText
                            style={[styles.score, { color: Colors.blue }]}
                        >
                            Score : {score}
                        </ThemedText>
                    </View>
                    <View style={styles.scoreContainer}>
                        <ThemedText style={styles.score}>
                            Meilleur score : {bestScore}
                        </ThemedText>
                    </View>
                </View>
                {hasWon && (
                    <ThemedText style={styles.won}>
                        Bravo ! Vous avez atteint le Père Noël 🎅
                    </ThemedText>
                )}
            </View>

            <Game2048Board board={board} onPlay={play} />

            {status === "gameover" && (
                <View style={styles.gameOverBanner}>
                    <ThemedText style={styles.gameOverText}>
                        Partie terminée
                    </ThemedText>
                    {isNewBest && (
                        <ThemedText style={styles.gameOverSubText}>
                            Nouveau record du jour !
                        </ThemedText>
                    )}
                    <Pressable
                        style={styles.replayButton}
                        onPress={startNewGame}
                    >
                        <ThemedText style={styles.replayButtonText}>
                            Rejouer
                        </ThemedText>
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.surface,
    },

    // HEADER
    header: {
        alignItems: "center",
        paddingTop: 20,
        gap: 16,
    },
    scoresContainer: {
        flexDirection: "row",
        gap: 16,
    },
    scoreContainer: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.snow,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    score: {
        fontSize: 16,
        color: Colors.snow,
    },
    won: {
        fontSize: 14,
        color: Colors.snow,
    },

    // FOOTER
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
