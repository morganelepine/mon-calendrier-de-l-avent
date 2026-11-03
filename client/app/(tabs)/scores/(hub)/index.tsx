import { useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { TotalScore } from "@/components/score/TotalScore";
import { OffSeasonMessage } from "@/components/score/OffSeasonMessage";
import { CheckInStreak } from "@/components/score/streak/CheckInStreak";
import { ScoreHistory } from "@/components/score/ScoreHistory";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { Score } from "@/interfaces/scoreInterface";
import { useScore } from "@/contexts/ScoreContext";
import { isDecember } from "@/constants/Dates";
import { Colors } from "@/constants/Colors";

export default function ScoreScreen() {
    const {
        scoreTotal,
        previousYearScore,
        scoreHistory,
        loading,
        error,
        refreshScores,
    } = useScore();

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            refreshScores();
            return () => {
                // Do something when the screen is unfocused
            };
        }, [refreshScores]),
    );

    return (
        <BlueBackground>
            <View style={styles.content}>
                <ErrorLoading
                    error={error}
                    loading={loading}
                    refreshScores={refreshScores}
                />

                {!isDecember && (
                    <OffSeasonMessage previousYearScore={previousYearScore} />
                )}

                {isDecember && !error && !loading && (
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        persistentScrollbar={true} // Android only
                    >
                        <TotalScore score={scoreTotal} />
                        <CheckInStreak
                            scoreHistory={scoreHistory}
                            refreshScores={refreshScores}
                        />
                        <ThemedText style={styles.title}>
                            Points par jour
                        </ThemedText>
                        <View style={styles.cardsWrapper}>
                            {scoreHistory.map((score: Score) => (
                                <ScoreHistory
                                    key={score.dayNumber}
                                    score={score}
                                />
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
    },
    title: {
        padding: 20,
        fontFamily: "FreightNeoBold",
        color: Colors.snow,
        fontSize: 20,
    },
    cardsWrapper: {
        paddingHorizontal: 20,
        marginBottom: 20,
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 16,
    },
});
