import { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { LeaderBoardButton } from "@/components/score/LeaderBoardButton";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { getGames2048LeaderboardAround } from "@/services/games2048.service";
import { Games2048LeaderboardAroundResponse } from "@/interfaces/games2048Interface";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContext";

const INITIAL_WINDOW = 5;
const WINDOW_STEP = 10;

// Where I rank in the global leaderboard - same windowed-around-me pattern
// as app/(tabs)/scores/(hub)/mine.tsx.
export default function Game2048LeaderboardMineScreen() {
    const { username } = useUser();
    const [before, setBefore] = useState(INITIAL_WINDOW);
    const [after, setAfter] = useState(INITIAL_WINDOW);
    const [result, setResult] =
        useState<Games2048LeaderboardAroundResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWindow = async (
        nextBefore: number,
        nextAfter: number,
    ): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const data = await getGames2048LeaderboardAround(
                nextBefore,
                nextAfter,
            );
            setResult(data);
            setBefore(nextBefore);
            setAfter(nextAfter);
        } catch (error) {
            console.error("Error fetching 2048 leaderboard window:", error);
            setError(
                "Impossible de charger votre classement. Vérifiez votre connexion Internet.",
            );
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchWindow(INITIAL_WINDOW, INITIAL_WINDOW);
        }, []),
    );

    return (
        <BlueBackground>
            <ErrorLoading
                error={error}
                loading={loading}
                refreshScores={() => fetchWindow(before, after)}
            />

            {!error && !loading && result && !result.userHasScore && (
                <View style={styles.centerContainer}>
                    <ThemedText style={styles.centerText}>
                        Vous n&apos;avez pas encore de score enregistré.
                        Lancez une partie pour apparaître dans le classement !
                    </ThemedText>
                </View>
            )}

            {!error && !loading && result?.userHasScore && (
                <FlatList
                    data={result.data}
                    keyExtractor={(item) => item.rank.toString()}
                    onRefresh={() => fetchWindow(before, after)}
                    refreshing={false}
                    ListHeaderComponent={
                        <>
                            <ThemedText style={styles.rankSummary}>
                                Vous êtes {result.userRank}e sur{" "}
                                {result.total}
                            </ThemedText>
                            {result.hasMoreAbove && (
                                <LeaderBoardButton
                                    onPress={() =>
                                        fetchWindow(before + WINDOW_STEP, after)
                                    }
                                    text="Voir les personnes classées avant"
                                />
                            )}
                        </>
                    }
                    renderItem={({ item, index }) => (
                        <LeaderBoardItem
                            index={index}
                            rank={item.rank}
                            item={item}
                            username={username}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    ListFooterComponent={
                        result.hasMoreBelow ? (
                            <LeaderBoardButton
                                onPress={() =>
                                    fetchWindow(before, after + WINDOW_STEP)
                                }
                                text="Voir les personnes classées après"
                            />
                        ) : null
                    }
                />
            )}
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    centerText: {
        color: Colors.snow,
        textAlign: "center",
    },
    rankSummary: {
        color: Colors.snow,
        textAlign: "center",
        paddingHorizontal: 20,
        marginTop: 16,
    },
});
