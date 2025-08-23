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
        score.scoreDetails.game.correctAnswer;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>
                        {score.dayNumber} décembre
                    </Text>
                    <Text
                        style={[
                            styles.cardTitle,
                            { fontFamily: "PoppinsBold" },
                        ]}
                    >
                        {scorePerDay}
                    </Text>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.row}>
                        <Ionicons
                            name="star"
                            size={18}
                            color={Colors.green}
                            style={styles.rowIcon}
                        />
                        <Text style={styles.rowLabel}>
                            Ouverture de la case du jour
                        </Text>
                        <Text>{score.scoreDetails.dayOpening}</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons
                            name="gift"
                            size={18}
                            color={Colors.green}
                            style={styles.rowIcon}
                        />
                        <Text style={styles.rowLabel}>
                            Ouverture des contenus
                        </Text>
                        <Text>{score.scoreDetails.contentOpening}</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons
                            name="game-controller"
                            size={18}
                            color={Colors.green}
                            style={styles.rowIcon}
                        />
                        <Text
                            style={[styles.rowLabel, { flex: 1 }]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            Bonnes réponses aux jeux
                        </Text>
                        <Text>{score.scoreDetails.game.correctAnswer}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: Colors.snow,
        borderRadius: 16,
        overflow: "hidden",
    },
    cardHeader: {
        backgroundColor: Colors.green,
        paddingHorizontal: 16,
        paddingTop: 6,
        paddingBottom: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cardTitle: {
        color: Colors.snow,
        fontSize: 16,
        fontFamily: "Poppins",
    },
    cardBody: {
        backgroundColor: Colors.snow,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
    },
    rowIcon: {
        marginRight: 10,
    },
    rowLabel: {
        flex: 1,
        color: Colors.blue,
        fontSize: 13,
        fontFamily: "Poppins",
        paddingTop: 2,
    },
});
