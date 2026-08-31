import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { GameScreenWrapper } from "@/components/utils/custom/GameScreenWrapper";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Hangman } from "@/components/content/games/hangman/Hangman";
import { OtherGames } from "@/components/content/games/others/OtherGames";
import { Quiz } from "@/components/content/games/quiz/Quiz";
import { showPointsToast } from "@/components/utils/Toast";
import { classifyGames, getContentsByDay } from "@/services/content.service";
import {
    getAnsweredQuestionsCount,
    isItemScored,
    queueScore,
    saveItemScored,
} from "@/services/score.service";
import { Content } from "@/interfaces/contentInterface";
import { ScoreType } from "@/enums/enums";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

export default function GameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const [games, setGames] = useState<Content[]>([]);
    const [answeredCount, setAnsweredCount] = useState(0);

    useEffect(() => {
        getContentsByDay(dayId)
            .then((contents) => setGames(contents.games))
            .catch(() => {});
    }, [dayId]);

    useEffect(() => {
        getAnsweredQuestionsCount(dayId, ScoreType.GameAnswer)
            .then(setAnsweredCount)
            .catch(() => {});
    }, [dayId]);

    const { gamesByType, type } = classifyGames(games);

    // There's only ever one game (or one quiz set) per day, so summing
    // across every bucket is equivalent to picking whichever one is
    // populated - and avoids having to branch on which one it is.
    const totalQuestions =
        (gamesByType.pendu?.content1.split(",").length ?? 0) +
        (gamesByType.jeu?.content1.split(",").length ?? 0) +
        gamesByType.quizCitation.length +
        gamesByType.quizNoel.length +
        gamesByType.quizEmojis.length +
        gamesByType.quizHalloween.length;

    const totalQuestionsText =
        gamesByType.pendu || gamesByType.jeu
            ? `Vous avez joué ${answeredCount} ${answeredCount > 1 ? "mots" : "mot"} sur ${totalQuestions}`
            : `Vous avez répondu à ${answeredCount} ${answeredCount > 1 ? "questions" : "question"} sur ${totalQuestions}`;

    // Replaying a question is always allowed - it just never scores twice.
    // The verdict is locked in locally *before* the network call,
    // so a wrong answer given offline still counts as this question's one attempt.
    const setScore = async (
        questionNumber: number,
        isCorrect: boolean,
    ): Promise<void> => {
        if (isOctober) return;

        const alreadyScored = await isItemScored(
            dayId,
            ScoreType.GameAnswer,
            questionNumber,
        );
        if (alreadyScored) return;

        await saveItemScored(dayId, ScoreType.GameAnswer, questionNumber);
        setAnsweredCount((count) => count + 1);

        const today = new Date().getDate();
        const score = dayId === today && isCorrect ? 20 : isCorrect ? 10 : 0;
        void queueScore(
            dayId,
            score,
            String(ScoreType.GameAnswer),
            questionNumber,
        );

        if (score > 0) showPointsToast(score);
    };

    return (
        <GameScreenWrapper contentType={type} dayId={dayId}>
            <CustomScrollView>
                {answeredCount > 0 && (
                    <ThemedText style={styles.progress}>
                        {totalQuestionsText}
                    </ThemedText>
                )}

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
    progress: {
        paddingHorizontal: 20,
        paddingTop: 12,
        color: Colors.red,
        opacity: 0.85,
        fontSize: 13,
    },
});
