import { Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Content } from "@/interfaces/contentInterface";
import { getButtonStyles } from "@/services/content.service";

interface QuizAnswersProps {
    currentGame: Content;
    answers: string[];
    handleAnswer: (answer: string) => void;
    selectedAnswer: string | null;
    answerButtonIsDisabled: boolean;
}

export const QuizAnswers: React.FC<QuizAnswersProps> = ({
    currentGame,
    answers,
    handleAnswer,
    selectedAnswer,
    answerButtonIsDisabled,
}) => {
    return (
        <>
            {answers.map((answer) => {
                const { buttonStyle, textStyle } = getButtonStyles(
                    answer,
                    selectedAnswer,
                    currentGame.content3
                );
                return (
                    <Pressable
                        key={answer}
                        onPress={() => {
                            handleAnswer(answer);
                        }}
                        style={buttonStyle}
                        disabled={answerButtonIsDisabled}
                    >
                        <ThemedText style={textStyle}>{answer}</ThemedText>
                    </Pressable>
                );
            })}
        </>
    );
};
