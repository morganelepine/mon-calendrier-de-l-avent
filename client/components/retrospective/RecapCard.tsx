import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { DaysGrid } from "@/components/retrospective/DaysGrid";
import {
    formatNumber,
    getTopText,
} from "@/components/retrospective/retrospectiveTexts";
import { Colors } from "@/constants/Colors";
import { Retrospective } from "@/interfaces/retrospectiveInterface";

// Content of the shareable recap card (goes inside a ShareCard).
export const RecapCard: React.FC<{ retrospective: Retrospective }> = ({
    retrospective,
}) => {
    const topText = getTopText(retrospective.points.topPercent);
    const correctAnswers = retrospective.correctAnswers.value;

    return (
        <View style={styles.card}>
            <ThemedText style={styles.title}>
                Mon Avent {retrospective.year}
            </ThemedText>
            <ThemedText style={styles.points}>
                {formatNumber(retrospective.points.value)} points
            </ThemedText>
            {topText && <ThemedText style={styles.line}>{topText}</ThemedText>}
            {correctAnswers > 0 && (
                <ThemedText style={styles.line}>
                    {formatNumber(correctAnswers)}{" "}
                    {correctAnswers > 1 ? "bonnes réponses" : "bonne réponse"}
                </ThemedText>
            )}
            <View style={styles.grid}>
                <DaysGrid
                    openedDays={retrospective.openedDays}
                    cellSize={22}
                    surface="dark"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
    },
    title: {
        fontFamily: "FreightNeoBold",
        fontSize: 28,
        lineHeight: 34,
        color: Colors.snow,
        textAlign: "center",
    },
    points: {
        fontFamily: "FreightNeoBold",
        fontSize: 36,
        lineHeight: 42,
        color: Colors.gold,
        textAlign: "center",
        marginTop: 8,
    },
    line: {
        fontSize: 15,
        color: Colors.snow,
        textAlign: "center",
    },
    grid: {
        marginTop: 16,
    },
});
