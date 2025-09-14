import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { GameScreenWrapper } from "@/components/utils/custom/GameScreenWrapper";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Hangman } from "@/components/content/games/hangman/Hangman";
import { Games } from "@/components/content/games/others/Games";
import { Quiz } from "@/components/content/games/quiz/Quiz";
import { classifyGames, getContentsByDay } from "@/services/content.service";
import { saveScore } from "@/services/score.service";
import { ScoreType } from "@/enums/enums";
import { useScore } from "@/contexts/ScoreContext";

export default function GameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { games } = getContentsByDay(dayId);
    const { gamesByType, type } = classifyGames(games);
    const { refreshScores } = useScore();

    const setScore = async (questionNumber: number) => {
        const today = new Date().getDate();
        const score = dayId === today ? 20 : 10;
        await saveScore(
            dayId,
            score,
            String(ScoreType.GameAnswer),
            questionNumber
        );
    };

    return (
        <GameScreenWrapper contentType={type}>
            <CustomScrollView>
                <View style={styles.container}>
                    {gamesByType.pendu && (
                        <Hangman
                            game={gamesByType.pendu}
                            setScore={setScore}
                            refreshScores={refreshScores}
                        />
                    )}

                    {gamesByType.jeu && (
                        <Games game={gamesByType.jeu} setScore={setScore} />
                    )}

                    {gamesByType.quizCitation.length > 0 && (
                        <>
                            <ThemedText
                                type="contentSubtitle"
                                style={{ textAlign: "center" }}
                            >
                                À quel film de Noël appartient
                                cette&nbsp;réplique&nbsp;?
                            </ThemedText>
                            <Quiz
                                games={gamesByType.quizCitation}
                                setScore={setScore}
                                dayId={dayId}
                                refreshScores={refreshScores}
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
                                dayId={dayId}
                                refreshScores={refreshScores}
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
                                dayId={dayId}
                                refreshScores={refreshScores}
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
    },
});
