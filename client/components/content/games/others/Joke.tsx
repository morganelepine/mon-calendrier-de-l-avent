import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { CustomButton } from "@/components/utils/buttons/Button";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { getButtonStyles } from "@/services/content.service";
import { setGameStatus } from "@/services/score.service";

interface JokeProps {
    game: Content;
    setScore: () => Promise<void>;
}

export const Joke: React.FC<JokeProps> = ({ game, setScore }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [win, setWin] = useState("");
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
                    await setScore();
                    setWin("Bonne réponse !");
                } else {
                    setWin(`Raté... la bonne réponse était : ${game.content3}`);
                }
                await setGameStatus(game.dayNumber);
                setShowAnswer(true);
            }
        };
        handleScoreUpdate();
    }, [selectedAnswer]);

    return (
        <View key={game.id}>
            <ThemedText type="modalSubtitle" style={styles.title}>
                {game.title}
            </ThemedText>

            <CustomMarkdown>{game.content1}</CustomMarkdown>

            {game.listOfContents ? (
                <View style={styles.answers}>
                    {game.listOfContents.map((answer) => {
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
            ) : (
                <CustomButton
                    style={{
                        marginVertical: 20,
                        backgroundColor: Colors.red,
                    }}
                    onPress={() => {
                        setShowAnswer(!showAnswer);
                    }}
                >
                    {showAnswer ? "Cacher la réponse" : "Voir la réponse"}
                </CustomButton>
            )}

            {showAnswer && (
                <View>
                    {win ? (
                        <ThemedText style={styles.longAnswer}>{win}</ThemedText>
                    ) : (
                        <>
                            {game.content2 && (
                                <ThemedText style={styles.shortAnswer}>
                                    {game.content2}
                                </ThemedText>
                            )}
                            {game.content3 && (
                                <ThemedText style={styles.longAnswer}>
                                    {game.content3}
                                </ThemedText>
                            )}
                        </>
                    )}

                    {game.content4 ? (
                        <ThemedText>{game.content4}</ThemedText>
                    ) : null}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        textAlign: "center",
    },
    answers: { marginTop: 10, marginBottom: 20 },
    shortAnswer: {
        fontFamily: "PallyBold",
        color: Colors.red,
        fontSize: 20,
        marginBottom: 10,
    },
    longAnswer: {
        fontFamily: "PoppinsBold",
        color: Colors.red,
        marginBottom: 10,
    },
});
