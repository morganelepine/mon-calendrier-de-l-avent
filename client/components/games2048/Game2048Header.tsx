import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { useGoalForCurrentSeason } from "@/hooks/useGame2048";
import { Game2048TierProgress } from "@/components/games2048/Game2048TierProgress";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors, Theme } from "@/constants/Colors";

interface Game2048HeaderProps {
    score: number;
    bestScore: number;
    hasWon: boolean;
    status: string;
    maxTier: number;
}

export const Game2048Header = ({
    score,
    bestScore,
    hasWon,
    status,
    maxTier,
}: Game2048HeaderProps) => {
    const goal = useGoalForCurrentSeason();

    return (
        <View style={styles.header}>
            <CustomButton
                onPress={() =>
                    router.push("/bingo/game2048-leaderboard/general")
                }
                color={Theme.autumnGreenDarkToautumnGreen}
                style={{ alignSelf: "flex-start" }}
            >
                Classement
            </CustomButton>

            {status !== "gameover" && (
                <Game2048TierProgress maxTier={maxTier} />
            )}

            <View style={styles.scoresRow}>
                <View
                    style={[
                        styles.scoreContainer,
                        { backgroundColor: Colors.snow },
                    ]}
                >
                    <ThemedText
                        style={[styles.score, { color: Theme.goldToBlue }]}
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
                    Bravo, vous avez réussi à atteindre {goal} Vous pouvez
                    continuer à jouer pour améliorer votre score.
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
});
