import { Pressable, StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { GameType } from "@/enums/enums";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

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

                {currentGame.content5 === GameType.QuizNoel &&
                currentGame.image ? (
                    <Image
                        source={{
                            uri: getCloudinaryImageUrl(currentGame.image),
                        }}
                        style={styles.image}
                    />
                ) : null}

                {currentGame.content5 === GameType.QuizCitation &&
                currentGame.content4 ? (
                    <View style={styles.videoContainer}>
                        <Video videoId={currentGame.content4} />
                    </View>
                ) : null}
            </View>

            {currentQuestionIndex === games.length - 1 ? (
                <ThemedText style={styles.finalText}>
                    Ce quiz de Noël est terminé 🎅
                </ThemedText>
            ) : (
                <Pressable
                    onPress={handleNextQuestion}
                    style={styles.nextQuestionButton}
                >
                    <ThemedText style={styles.nextQuestionText}>
                        Question suivante
                    </ThemedText>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    response: { fontFamily: "PoppinsBold" },
    explanationsContainer: {
        marginTop: 20,
    },
    explanations: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "left",
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        height: undefined,
        marginTop: 10,
        borderRadius: 30,
    },
    videoContainer: { marginTop: 10 },
    nextQuestionButton: {
        borderColor: Colors.red,
        borderWidth: 2,
        borderRadius: 50,
        paddingHorizontal: 20,
        minHeight: 48,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    nextQuestionText: {
        fontFamily: "PoppinsBold",
        color: Colors.red,
    },
    finalText: {
        fontFamily: "AnonymousProBold",
        fontSize: 14,
        marginVertical: 20,
        color: Colors.red,
    },
});
