import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { NextQuestion } from "@/components/content/games/util/NextQuestion";
import { GameType } from "@/enums/enums";

interface QuizExplanationProps {
    subType: string | undefined;
    correctAnswer: string;
    explanation?: string;
    videoId?: string;
    selectedAnswer: string;
    totalQuestions: number;
    currentQuestionIndex: number;
    handleNextQuestion: () => void;
}

export const QuizExplanation: React.FC<QuizExplanationProps> = ({
    subType,
    correctAnswer,
    explanation,
    videoId,
    selectedAnswer,
    totalQuestions,
    currentQuestionIndex,
    handleNextQuestion,
}) => {
    return (
        <View>
            <View>
                {selectedAnswer === correctAnswer ? (
                    <ThemedText style={styles.response}>
                        Bonne réponse !
                    </ThemedText>
                ) : (
                    <>
                        <ThemedText style={styles.response}>
                            Oops... la bonne réponse était :
                        </ThemedText>
                        <ThemedText style={styles.response}>
                            {correctAnswer}
                        </ThemedText>
                    </>
                )}

                {subType === GameType.QuizNoel ||
                subType === GameType.QuizHalloween ||
                (subType === GameType.QuizEmojis && explanation) ? (
                    <ThemedText style={styles.explanations}>
                        {explanation}
                    </ThemedText>
                ) : null}

                {subType === GameType.QuizCitation && videoId ? (
                    <View style={styles.videoContainer}>
                        <Video videoId={videoId} />
                    </View>
                ) : null}
            </View>

            <NextQuestion
                totalCount={totalQuestions}
                currentQuestionIndex={currentQuestionIndex}
                handleNextQuestion={handleNextQuestion}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    response: { fontFamily: "PoppinsBold" },
    explanations: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "left",
    },
    videoContainer: { marginTop: 10 },
});
