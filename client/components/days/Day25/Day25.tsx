import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Day25Win } from "@/components/days/Day25/Day25Win";
import { Day25Lost } from "@/components/days/Day25/Day25Lost";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { Colors } from "@/constants/Colors";
import { MIN_SCORE_TO_WIN } from "@/constants/score";
import { usePremium } from "@/contexts/PremiumContext";
import { useScore } from "@/contexts/ScoreContext";

export const Day25 = () => {
    const { isPremium } = usePremium();
    // Shared with the scores screen: no extra request if it's already loaded.
    const {
        scoreTotal: totalScore,
        loading,
        error,
        refreshScores,
        refreshScoresIfStale,
    } = useScore();

    useEffect(() => {
        void refreshScoresIfStale();
    }, [refreshScoresIfStale]);

    const renderContent = () => {
        if (loading || error) {
            return (
                <ErrorLoading
                    loading={loading}
                    error={error}
                    refreshScores={refreshScores}
                />
            );
        }
        if (isPremium || totalScore >= MIN_SCORE_TO_WIN) {
            return <Day25Win totalScore={totalScore} isPremium={isPremium} />;
        }
        return <Day25Lost />;
    };

    return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blue,
    },
});
