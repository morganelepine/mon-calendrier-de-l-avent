import { Pressable, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { getButtonStyles } from "@/services/content.service";

interface QuizAnswersProps {
    correctAnswer: string;
    answers: string[];
    handleAnswer: (answer: string) => void;
    selectedAnswer: string | null;
    answerButtonIsDisabled: boolean;
}

export const QuizAnswers: React.FC<QuizAnswersProps> = ({
    correctAnswer,
    answers,
    handleAnswer,
    selectedAnswer,
    answerButtonIsDisabled,
}) => {
    return (
        <View style={{ marginBottom: 30 }}>
            {answers.map((answer) => {
                const { buttonStyle, textStyle } = getButtonStyles(
                    answer,
                    selectedAnswer,
                    correctAnswer
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
                        <ThemedText style={textStyle as any}>
                            {answer}
                        </ThemedText>
                    </Pressable>
                );
            })}
        </View>
    );
};
