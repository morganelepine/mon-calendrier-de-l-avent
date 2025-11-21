import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { StoryGameRulesModal } from "@/components/content/story/game/StoryGameRulesModal";
import { StoryGameModal } from "@/components/content/story/game/StoryGameModal";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { answers } from "@/data/story_game_clues";

export default function StoryGameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = Number.parseInt(id, 10);

    const [rulesModalVisible, setRulesModalVisible] = useState(false);

    const titles = [
        "Les étoiles d'Énisor",
        "Les marges de décembre",
        "La lettre de Noël",
    ];

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (answer: string, index: number) => {
        setSelectedAnswer(answer);
        setSelectedIndex(index);
        setModalVisible(true);
    };

    return (
        <>
            <View style={styles.container}>
                <Pressable onPress={() => setRulesModalVisible(true)}>
                    <ThemedText type="italic14" style={styles.rules}>
                        Voir les règles
                    </ThemedText>
                </Pressable>

                <ThemedText style={{ marginBottom: 16, textAlign: "center" }}>
                    Pour quelle nouvelle de Noël souhaitez-vous tenter votre
                    chance ?
                </ThemedText>

                {answers.map((answer, index) => {
                    let availableDay = 2;
                    if (index === 1) availableDay = 13;
                    if (index === 2) availableDay = 19;

                    const disabled = dayId < availableDay;

                    return (
                        <View key={answer} style={{ marginVertical: 16 }}>
                            <CustomButton
                                style={
                                    disabled
                                        ? styles.buttonDisabled
                                        : styles.button
                                }
                                onPress={() => openModal(answer, index)}
                                disabled={disabled}
                            >
                                {titles[index]}
                            </CustomButton>

                            {disabled && (
                                <ThemedText
                                    type={"italic14"}
                                    style={{
                                        textAlign: "center",
                                        marginTop: 8,
                                    }}
                                >
                                    Disponible le {availableDay} décembre
                                </ThemedText>
                            )}
                        </View>
                    );
                })}
            </View>

            {selectedAnswer !== null && selectedIndex !== null && (
                <StoryGameModal
                    answer={selectedAnswer}
                    index={selectedIndex}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    titles={titles}
                    dayId={dayId}
                />
            )}

            <StoryGameRulesModal
                modalVisible={rulesModalVisible}
                setModalVisible={setRulesModalVisible}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.snow,
        flex: 1,
    },
    rules: {
        textAlign: "right",
        marginBottom: 16,
        color: Colors.green,
        textDecorationLine: "underline",
    },
    button: {
        backgroundColor: Colors.green,
        marginBottom: 8,
    },
    buttonDisabled: {
        backgroundColor: Colors.disabled,
    },
});
