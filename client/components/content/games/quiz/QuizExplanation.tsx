import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { NextQuestion } from "@/components/content/games/util/NextQuestion";
import { Content } from "@/interfaces/contentInterface";
import { GameType } from "@/enums/enums";

interface QuizExplanationProps {
    games: Content[];
    selectedAnswer: string;
    currentGame: Content;
    currentQuestionIndex: number;
    handleNextQuestion: () => void;
}

export const QuizExplanation: React.FC<QuizExplanationProps> = ({
    games,
    selectedAnswer,
    currentGame,
    currentQuestionIndex,
    handleNextQuestion,
}) => {
    return (
        <View>
            <View style={[styles.explanationsContainer]}>
                {selectedAnswer === currentGame.content3 ? (
                    <ThemedText style={styles.response}>
                        Bonne réponse !
                    </ThemedText>
                ) : (
                    <>
                        <ThemedText style={styles.response}>
                            Oops... la bonne réponse était :
                        </ThemedText>
                        <ThemedText style={styles.response}>
                            {currentGame.content3}
                        </ThemedText>
                    </>
                )}

                {currentGame.content5 === GameType.QuizNoel ||
                (currentGame.content5 === GameType.QuizEmojis &&
                    currentGame.content4) ? (
                    <ThemedText style={styles.explanations}>
                        {currentGame.content4}
                    </ThemedText>
                ) : null}

                {currentGame.content5 === GameType.QuizCitation &&
                currentGame.content4 ? (
                    <View style={styles.videoContainer}>
                        <Video videoId={currentGame.content4} />
                    </View>
                ) : null}
            </View>

            <NextQuestion
                games={games}
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
