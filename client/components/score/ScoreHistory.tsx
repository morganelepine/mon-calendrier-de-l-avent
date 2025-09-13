import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { Score } from "@/interfaces/scoreInterfaces";
import { Ionicons } from "@expo/vector-icons";

interface ScoreHistoryProps {
    score: Score;
}

export const ScoreHistory: React.FC<ScoreHistoryProps> = ({ score }) => {
    const scorePerDay =
        score.scoreDetails.dayOpening +
        score.scoreDetails.contentOpening +
        score.scoreDetails.gameAnswer;

    const isToday = score.dayNumber === new Date().getDate();

    const maxScoreDay = score.scoreDetails.dayOpening === 40;
    const maxScoreContent = score.scoreDetails.contentOpening === 4 * 20;
    const maxScoreGame = score.scoreDetails.gameAnswer === 3 * 20;

    return (
        <View style={styles.card}>
            <View
                style={[
                    styles.cardHeader,
                    isToday && { backgroundColor: Colors.red },
                ]}
            >
                <Text style={styles.cardTitle}>Jour {score.dayNumber}</Text>
                <Text style={[styles.cardTitle, { fontFamily: "PoppinsBold" }]}>
                    {scorePerDay} pts
                </Text>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.cardLine}>
                    <Ionicons
                        name="calendar"
                        size={18}
                        color={isToday ? Colors.red : Colors.green}
                    />
                    <Text style={styles.cardLineText}>
                        Jour :{" "}
                        <Text
                            style={[
                                styles.cardLineScore,
                                isToday && { color: Colors.red },
                            ]}
                        >
                            {score.scoreDetails.dayOpening}{" "}
                        </Text>
                        {maxScoreDay && (
                            <Ionicons
                                name="star"
                                size={12}
                                color={Colors.gold}
                            />
                        )}
                    </Text>
                </View>
                <View style={styles.cardLine}>
                    <Ionicons
                        name="gift"
                        size={18}
                        color={isToday ? Colors.red : Colors.green}
                    />
                    <Text style={styles.cardLineText}>
                        Contenu :{" "}
                        <Text
                            style={[
                                styles.cardLineScore,
                                isToday && { color: Colors.red },
                            ]}
                        >
                            {score.scoreDetails.contentOpening}{" "}
                        </Text>
                        {maxScoreContent && (
                            <Ionicons
                                name="star"
                                size={12}
                                color={Colors.gold}
                            />
                        )}
                    </Text>
                </View>
                <View style={styles.cardLine}>
                    <Ionicons
                        name="game-controller"
                        size={18}
                        color={isToday ? Colors.red : Colors.green}
                    />
                    <Text style={styles.cardLineText}>
                        Jeu :{" "}
                        <Text
                            style={[
                                styles.cardLineScore,
                                isToday && { color: Colors.red },
                            ]}
                        >
                            {score.scoreDetails.gameAnswer}{" "}
                        </Text>
                        {maxScoreGame && (
                            <Ionicons
                                name="star"
                                size={12}
                                color={Colors.gold}
                            />
                        )}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "46%",
        backgroundColor: Colors.snow,
        borderRadius: 12,
        overflow: "hidden",
    },
    cardHeader: {
        backgroundColor: Colors.green,
        paddingHorizontal: 8,
        paddingTop: 6,
        paddingBottom: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cardTitle: {
        color: Colors.snow,
        fontSize: 15,
        fontFamily: "Poppins",
    },
    cardBody: {
        backgroundColor: Colors.snow,
        padding: 8,
        gap: 4,
    },
    cardLine: {
        flexDirection: "row",
        alignItems: "stretch",
    },
    cardLineText: {
        marginLeft: 6,
        fontFamily: "Poppins",
        fontSize: 14,
        color: Colors.blue,
    },
    cardLineScore: {
        fontFamily: "PoppinsBold",
        color: Colors.green,
    },
});
