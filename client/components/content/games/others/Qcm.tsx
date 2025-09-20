import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { getButtonStyles } from "@/services/content.service";

interface JokeProps {
    game: Content;
    setScore: (questionNumber: number) => Promise<void>;
    setShowAnswer: (show: boolean) => void;
    setWin: (text: string) => void;
}

export const Qcm: React.FC<JokeProps> = ({
    game,
    setScore,
    setShowAnswer,
    setWin,
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answerButtonIsDisabled, setAnswerButtonIsDisabled] =
        useState<boolean>(false);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setAnswerButtonIsDisabled(true);
    };

    useEffect(() => {
        const handleScoreUpdate = async () => {
            if (selectedAnswer !== null) {
                if (selectedAnswer === game.content3) {
                    await setScore(1);
                    setWin("Bonne réponse !");
                } else {
                    setWin(`Raté... la bonne réponse était : ${game.content3}`);
                }
                setShowAnswer(true);
            }
        };
        handleScoreUpdate();
    }, [selectedAnswer]);

    return (
        <View style={styles.answers}>
            {game.listOfContents?.map((answer) => {
                const { buttonStyle, textStyle } = getButtonStyles(
                    answer.title,
                    selectedAnswer,
                    game.content3
                );
                return (
                    <Pressable
                        key={answer.id}
                        style={buttonStyle}
                        onPress={() => {
                            handleAnswer(answer.title);
                        }}
                        disabled={answerButtonIsDisabled}
                    >
                        <ThemedText style={textStyle}>
                            {answer.title}
                        </ThemedText>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    answers: { marginTop: 10, marginBottom: 20 },
    shortAnswer: {
        fontFamily: "PallyBold",
        color: Colors.red,
        fontSize: 20,
        marginBottom: 10,
    },
});
