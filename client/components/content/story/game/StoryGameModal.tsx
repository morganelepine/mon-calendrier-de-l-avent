import { useState, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { GameToAnswer } from "@/components/content/story/game/GameToAnswer";
import { GameAnswered } from "@/components/content/story/game/GameAnswered";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface StoryGameModalProps {
    answer: string;
    index: number;
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    titles: string[];
    dayId: number;
}

export const StoryGameModal: React.FC<StoryGameModalProps> = ({
    answer,
    index,
    modalVisible,
    setModalVisible,
    titles,
    dayId,
}) => {
    const [input, setInput] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [win, setWin] = useState(false);

    const loadAnswer = async () => {
        const stored = await AsyncStorage.getItem("storyGameAnswers");
        if (stored) {
            const answers = JSON.parse(stored) as Record<number, string>;
            if (answers[index]) {
                setInput(answers[index]);
                setShowResult(true);
                setWin(answers[index].toLowerCase() === answer.toLowerCase());
            }
        }
    };

    useEffect(() => {
        setInput("");
        setShowResult(false);
        setWin(false);
        loadAnswer();
    }, [index, modalVisible]);

    return (
        <CustomModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={{ height: 20 }}></View>
                    <CustomScrollView>
                        <View style={{ marginHorizontal: 20 }}>
                            {showResult ? (
                                <GameAnswered
                                    answer={answer}
                                    index={index}
                                    win={win}
                                />
                            ) : (
                                <GameToAnswer
                                    answer={answer}
                                    index={index}
                                    setWin={setWin}
                                    input={input}
                                    setInput={setInput}
                                    setShowResult={setShowResult}
                                    title={titles[index]}
                                    dayId={dayId}
                                />
                            )}
                        </View>
                    </CustomScrollView>

                    <Pressable
                        onPress={() => {
                            setModalVisible(false);
                        }}
                        style={styles.closeButton}
                    >
                        <Ionicons
                            name={"close-outline"}
                            size={35}
                            color={Colors.blue}
                        />
                    </Pressable>
                </View>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        height: "75%",
        marginHorizontal: 20,
        alignItems: "center",
        backgroundColor: Colors.snow,
        borderRadius: 20,
        elevation: 4,
    },
    closeButton: {
        marginTop: 10,
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
});
