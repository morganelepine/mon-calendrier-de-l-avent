import { StyleSheet, View } from "react-native";
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
            <View style={styles.scoresContainer}>
                <View
                    style={[
                        styles.scoreContainer,
                        { backgroundColor: Colors.snow },
                    ]}
                >
                    <ThemedText style={[styles.score, { color: Theme.tint }]}>
                        Score : {score}
                    </ThemedText>
                </View>
                <View style={styles.scoreContainer}>
                    <ThemedText style={styles.score}>
                        Meilleur score : {bestScore}
                    </ThemedText>
                </View>
            </View>

            {status !== "gameover" && <Game2048TierProgress />}

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
    scoresContainer: {
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    scoreContainer: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.snow,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    score: {
        fontSize: 16,
        color: Colors.snow,
    },
    won: {
        paddingHorizontal: 20,
        fontSize: 14,
        color: Colors.snow,
        textAlign: "center",
    },
});
