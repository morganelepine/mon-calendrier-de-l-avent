import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Game2048TierProgress } from "@/components/games2048/Game2048TierProgress";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

interface Game2048HeaderProps {
    score: number;
    bestScore: number;
    hasWon: boolean;
    status: string;
}

export const Game2048Header = ({
    score,
    bestScore,
    hasWon,
    status,
}: Game2048HeaderProps) => {
    const goal = isOctober ? "chaudron magique !" : "Père Noël 🎅";
    return (
        <View style={styles.header}>
            <Pressable
                onPress={() =>
                    router.push("/bingo/game2048-leaderboard/general")
                }
                style={styles.leaderboardButton}
            >
                <ThemedText style={styles.leaderboardText}>
                    Classement
                </ThemedText>
            </Pressable>

            {status !== "gameover" && <Game2048TierProgress />}

            <View style={styles.scoresRow}>
                <View
                    style={[
                        styles.scoreContainer,
                        { backgroundColor: Colors.snow },
                    ]}
                >
                    <ThemedText
                        style={[styles.score, { color: Theme.surface }]}
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
                    Bravo ! Vous avez réussi à atteindre le&nbsp;{goal}
                </ThemedText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 20,
        gap: 16,
    },
    scoresRow: {
        paddingHorizontal: 20,
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        marginTop: 16,
    },
    scoreContainer: {
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: Colors.snow,
    },
    score: {
        fontSize: 14,
        color: Colors.snow,
        textAlign: "center",
    },
    won: {
        paddingHorizontal: 20,
        fontSize: 14,
        color: Colors.snow,
        textAlign: "center",
    },
    leaderboardButton: {
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 4,
        backgroundColor: Theme.autumnGreen,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.snow,
        alignSelf: "flex-start",
    },
    leaderboardText: {
        color: Colors.snow,
        textAlign: "center",
        fontSize: 14,
    },
});
