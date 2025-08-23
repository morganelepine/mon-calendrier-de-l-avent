import { useEffect, useRef, useState } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { loadScores, getTotalScore } from "@/services/score.service";
import { RulesButton } from "@/components/score/RulesButton";
import { RulesModal } from "@/components/score/RulesModal";
import { TotalScore } from "@/components/score/TotalScore";
import { ScoreHistory } from "@/components/score/ScoreHistory";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { Score } from "@/interfaces/scoreInterfaces";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

export default function ScoreScreen() {
    const scrollViewRef = useRef<ScrollView>(null);
    const backgroundImage = getCloudinaryImageUrl(
        "blue_background_darker_d10kn5"
    );

    const [modalVisible, setModalVisible] = useState(false);

    const [score, setScore] = useState(0);
    const [scoreHistory, setScoreHistory] = useState<Score[]>([]);

    useEffect(() => {
        const getScores = async () => {
            const scores = await loadScores();
            setScoreHistory(scores);
        };
        getScores();
    }, [scoreHistory]);

    useEffect(() => {
        const getScoreTotal = async () => {
            const totalScore = await getTotalScore();
            setScore(totalScore);
        };
        getScoreTotal();
    }, [scoreHistory]);

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <CustomSafeAreaView>
                <RulesButton setModalVisible={setModalVisible} />

                <TotalScore score={score} />

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    persistentScrollbar={true} // Android only
                >
                    {scoreHistory.map((score: Score) => (
                        <ScoreHistory key={score.dayNumber} score={score} />
                    ))}

                    <RulesModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                </ScrollView>
            </CustomSafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        width: "100%",
    },
});
