import { useCallback, useState } from "react";
import { StyleSheet, ScrollView, ImageBackground, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScoresButton } from "@/components/score/ScoresButton";
import { RulesModal } from "@/components/score/RulesModal";
import { TotalScore } from "@/components/score/TotalScore";
import { ScoreHistory } from "@/components/score/ScoreHistory";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { Score } from "@/interfaces/scoreInterfaces";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { useScore } from "@/contexts/ScoreContext";
import { Colors } from "@/constants/Colors";

export default function ScoreScreen() {
    const [modalVisible, setModalVisible] = useState(false);
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
        <ImageBackground
            source={{
                uri: getCloudinaryImageUrl("blue_background_darker_d10kn5"),
            }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <CustomSafeAreaView>
                <ScoresButton setModalVisible={setModalVisible} />
                <RulesModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />

                <TotalScore score={scoreTotal} />

                <ErrorLoading
                    error={error}
                    loading={loading}
                    refreshScores={refreshScores}
                ></ErrorLoading>

                <ScrollView
                    persistentScrollbar={true} // Android only
                >
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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
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
