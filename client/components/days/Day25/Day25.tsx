import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Day25Win } from "@/components/days/Day25/Day25Win";
import { Day25Lost } from "@/components/days/Day25/Day25Lost";
import { Colors } from "@/constants/Colors";
import { getTotalScore } from "@/services/score.service";

interface Day25Props {
    dayId: number;
}

export const Day25: React.FC<Day25Props> = ({ dayId }) => {
    const [totalScore, setTotalScore] = useState<number>(0);

    useEffect(() => {
        const getScoreTotal = async () => {
            const totalScore = await getTotalScore();
            setTotalScore(totalScore);
        };
        getScoreTotal();
    }, []);

    return (
        <View style={styles.container}>
            {totalScore >= 2512 ? (
                <Day25Win totalScore={totalScore} />
            ) : (
                <Day25Lost />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blue,
    },
});
