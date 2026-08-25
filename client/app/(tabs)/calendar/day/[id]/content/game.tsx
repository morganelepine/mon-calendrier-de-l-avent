import { useEffect, useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { GameScreenWrapper } from "@/components/utils/custom/GameScreenWrapper";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Hangman } from "@/components/content/games/hangman/Hangman";
import { OtherGames } from "@/components/content/games/others/OtherGames";
import { Quiz } from "@/components/content/games/quiz/Quiz";
import { classifyGames, getContentsByDay } from "@/services/content.service";
import { saveScore } from "@/services/score.service";
import { Content } from "@/interfaces/contentInterface";
import { ScoreType } from "@/enums/enums";

export default function GameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const [games, setGames] = useState<Content[]>([]);

    useEffect(() => {
        getContentsByDay(dayId)
            .then((contents) => setGames(contents.games))
            .catch(() => {});
    }, [dayId]);

    const { gamesByType, type } = classifyGames(games);

    const setScore = async (
        questionNumber: number,
        isCorrect: boolean,
    ): Promise<void> => {
        const today = new Date().getDate();
        const score = dayId === today && isCorrect ? 20 : isCorrect ? 10 : 0;
        try {
            await saveScore(
                dayId,
                score,
                String(ScoreType.GameAnswer),
                questionNumber,
            );
        } catch (error) {
            console.log("Error saving score:", error);
            ToastAndroid.show(
                "Oops... votre score n'a pas pu être enregistré.",
                ToastAndroid.LONG,
            );
        }
    };

    return (
        <GameScreenWrapper contentType={type} dayId={dayId}>
            <CustomScrollView>
                <View style={styles.container}>
                    {gamesByType.pendu && (
                        <Hangman game={gamesByType.pendu} setScore={setScore} />
                    )}

                    {gamesByType.jeu && (
                        <OtherGames
                            game={gamesByType.jeu}
                            setScore={setScore}
                        />
                    )}

                    {gamesByType.quizCitation.length > 0 && (
                        <>
                            <ThemedText type="contentSubtitle">
                                À quel film de Noël appartient
                                cette&nbsp;réplique&nbsp;?
                            </ThemedText>
                            <Quiz
                                games={gamesByType.quizCitation}
                                setScore={setScore}
                            />
                        </>
                    )}

                    {gamesByType.quizNoel.length > 0 && (
                        <>
                            <ThemedText type="contentSubtitle">
                                Êtes-vous incollable sur&nbsp;Noël&nbsp;?
                            </ThemedText>
                            <Quiz
                                games={gamesByType.quizNoel}
                                setScore={setScore}
                            />
                        </>
                    )}

                    {gamesByType.quizEmojis.length > 0 && (
                        <>
                            <ThemedText type="contentSubtitle">
                                Êtes-vous incollable sur&nbsp;Noël&nbsp;?
                            </ThemedText>
                            <Quiz
                                games={gamesByType.quizEmojis}
                                setScore={setScore}
                            />
                        </>
                    )}

                    {gamesByType.quizHalloween.length > 0 && (
                        <>
                            <ThemedText type="contentSubtitle">
                                Êtes-vous incollable sur l'automne et
                                Halloween&nbsp;?
                            </ThemedText>
                            <Quiz
                                games={gamesByType.quizHalloween}
                                setScore={setScore}
                            />
                        </>
                    )}
                </View>
            </CustomScrollView>
        </GameScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
});
