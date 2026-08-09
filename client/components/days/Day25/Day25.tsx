import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Day25Win } from "@/components/days/Day25/Day25Win";
import { Day25Lost } from "@/components/days/Day25/Day25Lost";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { Colors } from "@/constants/Colors";
import { getTotalScore } from "@/services/score.service";

export const Day25 = () => {
    const [totalScore, setTotalScore] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTotalScore = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const totalScore = await getTotalScore();
            setTotalScore(totalScore ?? 0);
        } catch (err) {
            console.error("Error fetching total score:", err);
            setError(
                "Impossible de charger votre score. Vérifiez votre connexion Internet.",
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTotalScore();
    }, [fetchTotalScore]);

    const renderContent = () => {
        if (loading || error) {
            return (
                <ErrorLoading
                    loading={loading}
                    error={error}
                    refreshScores={fetchTotalScore}
                />
            );
        }
        if (totalScore >= 2512) {
            return <Day25Win totalScore={totalScore} />;
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
