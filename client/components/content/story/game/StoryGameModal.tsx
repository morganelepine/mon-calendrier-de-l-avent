import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { GameToAnswer } from "@/components/content/story/game/GameToAnswer";
import { GameAnswered } from "@/components/content/story/game/GameAnswered";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";

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
        <ModalWithCloseButton
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={{ height: 20 }}></View>
            <CustomScrollView>
                <View style={{ marginHorizontal: 20 }}>
                    {showResult ? (
                        <GameAnswered answer={answer} index={index} win={win} />
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
        </ModalWithCloseButton>
    );
};

const styles = StyleSheet.create({});
