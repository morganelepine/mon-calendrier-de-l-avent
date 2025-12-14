import { useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScoresButton } from "@/components/score/ScoresButton";
import { TotalScore } from "@/components/score/TotalScore";
import { ScoreHistory } from "@/components/score/ScoreHistory";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { Score } from "@/interfaces/scoreInterfaces";
import { useScore } from "@/contexts/ScoreContext";

export default function ScoreScreen() {
    const { scoreTotal, scoreHistory, loading, error, refreshScores } =
        useScore();

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            refreshScores();
            return () => {
                // Do something when the screen is unfocused
            };
        }, [refreshScores])
    );

    return (
        <BackgroundImage image="blue_background_darker_d10kn5">
            <CustomSafeAreaView>
                <ScoresButton />

                <TotalScore score={scoreTotal} />

                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    persistentScrollbar={true} // Android only
                >
                    <ErrorLoading
                        error={error}
                        loading={loading}
                        refreshScores={refreshScores}
                    ></ErrorLoading>

                    {!error && !loading && (
                        <View style={styles.cardsWrapper}>
                            {scoreHistory.map((score: Score) => (
                                <ScoreHistory
                                    key={score.dayNumber}
                                    score={score}
                                />
                            ))}
                        </View>
                    )}
                </ScrollView>
            </CustomSafeAreaView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
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
