import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { GameModal } from "@/components/utils/custom/GameModal";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Hangman } from "@/components/content/games/hangman/Hangman";
import { Games } from "@/components/content/games/others/Games";
import { Quiz } from "@/components/content/games/quiz/Quiz";
import { classifyGames, getContentsByDay } from "@/services/content.service";
import { updateScore } from "@/services/score.service";
import { ScoreType } from "@/enums/enums";

export default function GameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { games } = getContentsByDay(dayId);
    const { gamesByType, type } = classifyGames(games);

    const setScore = async () => {
        await updateScore(dayId, ScoreType.GameCorrectAnswer);
    };

    return (
        <GameModal contentType={type}>
            <CustomScrollView>
                <View style={styles.container}>
                    {gamesByType.pendu && (
                        <Hangman game={gamesByType.pendu} setScore={setScore} />
                    )}

                    {gamesByType.jeu && (
                        <Games game={gamesByType.jeu} setScore={setScore} />
                    )}

                    {gamesByType.quizCitation.length > 0 && (
                        <>
                            <ThemedText
                                type="modalSubtitle"
                                style={{ textAlign: "center" }}
                            >
                                À quel film de Noël appartient cette
                                réplique&nbsp;?
                            </ThemedText>
                            <Quiz
                                games={gamesByType.quizCitation}
                                setScore={setScore}
                                dayId={dayId}
                            />
                        </>
                    )}

                    {gamesByType.quizNoel.length > 0 && (
                        <>
                            <ThemedText type="modalSubtitle">
                                Êtes-vous incollable sur&nbsp;Noël&nbsp;?
                            </ThemedText>
                            <Quiz
                                games={gamesByType.quizNoel}
                                setScore={setScore}
                                dayId={dayId}
                            />
                        </>
                    )}

                    {gamesByType.quizEmojis.length > 0 && (
                        <>
                            <ThemedText type="modalSubtitle">
                                Êtes-vous incollable sur&nbsp;Noël&nbsp;?
                            </ThemedText>
                            <Quiz
                                games={gamesByType.quizEmojis}
                                setScore={setScore}
                                dayId={dayId}
                            />
                        </>
                    )}
                </View>
            </CustomScrollView>
        </GameModal>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 10,
    },
});
