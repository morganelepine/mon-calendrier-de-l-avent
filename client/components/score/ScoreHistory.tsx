import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { currentDay } from "@/constants/Dates";
import { Score } from "@/interfaces/scoreInterface";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ScoreLineProps {
    icon: React.ComponentProps<typeof Ionicons>["name"];
    label: string;
    points: number;
    isMax?: boolean;
    isToday: boolean;
}

const ScoreLine: React.FC<ScoreLineProps> = ({
    icon,
    label,
    points,
    isMax,
    isToday,
}) => (
    <View style={styles.cardLine}>
        <Ionicons
            name={icon}
            size={18}
            color={isToday ? Colors.red : Colors.green}
        />
        <Text style={styles.cardLineText}>
            {label} :{" "}
            <Text
                style={[styles.cardLineScore, isToday && { color: Colors.red }]}
            >
                {points}{" "}
            </Text>
            {isMax && <Ionicons name="star" size={12} color={Colors.gold} />}
        </Text>
    </View>
);

interface ScoreHistoryProps {
    score: Score;
}

export const ScoreHistory: React.FC<ScoreHistoryProps> = ({ score }) => {
    const scorePerDay =
        score.scoreDetails.dayOpening +
        score.scoreDetails.contentOpening +
        score.scoreDetails.gameAnswer +
        score.scoreDetails.checkIn;
    // The streak bonus comes from the daily check-in, so a day can have one without being opened.
    const hasCheckInBonus = score.scoreDetails.checkIn > 0;

    const isToday = score.dayNumber === currentDay;

    const maxScoreDay = score.scoreDetails.dayOpening === 40;
    const maxScoreContent = score.scoreDetails.contentOpening === 4 * 20;
    const maxScoreGame = score.scoreDetails.gameAnswer === 3 * 15;

    return (
        <View style={styles.card}>
            <View
                style={[
                    styles.cardHeader,
                    isToday && { backgroundColor: Colors.red },
                    !score.dayIsOpen &&
                        !isToday && { backgroundColor: Colors.disabled },
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        !score.dayIsOpen &&
                            !isToday && { color: Colors.disabledText },
                    ]}
                >
                    Jour {score.dayNumber}
                </Text>
                {(score.dayIsOpen || hasCheckInBonus) && (
                    <Text
                        style={[
                            styles.cardTitle,
                            { fontFamily: "PoppinsBold" },
                        ]}
                    >
                        {scorePerDay} pts
                    </Text>
                )}
            </View>

            <View style={styles.cardBody}>
                {score.dayIsOpen ? (
                    <>
                        <ScoreLine
                            icon="calendar"
                            label="Jour"
                            points={score.scoreDetails.dayOpening}
                            isMax={maxScoreDay}
                            isToday={isToday}
                        />
                        <ScoreLine
                            icon="gift"
                            label="Contenus"
                            points={score.scoreDetails.contentOpening}
                            isMax={maxScoreContent}
                            isToday={isToday}
                        />
                        <ScoreLine
                            icon="game-controller"
                            label="Jeux"
                            points={score.scoreDetails.gameAnswer}
                            isMax={maxScoreGame}
                            isToday={isToday}
                        />
                        {hasCheckInBonus && (
                            <ScoreLine
                                icon="sparkles"
                                label="Guirlande"
                                points={score.scoreDetails.checkIn}
                                isToday={isToday}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <Text
                            style={[
                                styles.cardLineText,
                                { color: Colors.disabledText },
                            ]}
                        >
                            Vous n'avez pas encore ouvert le&nbsp;jour{" "}
                            {score.dayNumber}
                        </Text>
                        {hasCheckInBonus && (
                            <ScoreLine
                                icon="sparkles"
                                label="Guirlande"
                                points={score.scoreDetails.checkIn}
                                isToday={isToday}
                            />
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexBasis: "45%",
        flexGrow: 1,
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
        gap: 6,
    },
    cardLineText: {
        fontFamily: "Poppins",
        fontSize: 14,
        color: Colors.blue,
    },
    cardLineScore: {
        fontFamily: "PoppinsBold",
        color: Colors.green,
    },
});
