import { useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScoresButton } from "@/components/score/ScoresButton";
import { TotalScore } from "@/components/score/TotalScore";
import { ScoreHistory } from "@/components/score/ScoreHistory";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { Score } from "@/interfaces/scoreInterface";
import { useScore } from "@/contexts/ScoreContext";
import { isDecember } from "@/constants/Dates";

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
            <CustomSafeAreaView>
                <ScoresButton />

                <View style={styles.content}>
                    <ErrorLoading
                        error={error}
                        loading={loading}
                        refreshScores={refreshScores}
                    />

                    {!error && !loading && (
                        <TotalScore
                            score={scoreTotal}
                            previousYearScore={previousYearScore}
                        />
                    )}

                    {isDecember && !error && !loading && (
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                            persistentScrollbar={true} // Android only
                        >
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
            </CustomSafeAreaView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
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
