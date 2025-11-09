import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { QuizAnswers } from "@/components/content/games/quiz/QuizAnswers";
import { QuizExplanation } from "@/components/content/games/quiz/QuizExplanation";
import { Content } from "@/interfaces/contentInterface";
import { isQuestionPlayed, saveQuestionPlayed } from "@/services/score.service";
import { GameType } from "@/enums/enums";

interface QuizProps {
    games: Content[];
    setScore: (questionNumber: number) => Promise<void>;
    dayId: number;
}

export const Quiz: React.FC<QuizProps> = ({ games, setScore, dayId }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const currentGame = games[currentQuestionIndex];
    const answers = currentGame.content2.split(",");
    const [answerButtonIsDisabled, setAnswerButtonIsDisabled] =
        useState<boolean>(false);

    const handleAnswer = async (answer: string) => {
        setSelectedAnswer(answer);
        setAnswerButtonIsDisabled(true);

        const alreadyPlayed = await isQuestionPlayed(
            dayId,
            currentQuestionIndex
        );

        if (!alreadyPlayed) {
            if (answer === currentGame.content3) {
                setScore(currentQuestionIndex);
            }
            await saveQuestionPlayed(dayId, currentQuestionIndex);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswerButtonIsDisabled(false);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % games.length);
    };

    return (
        <>
            {currentGame.content5 === GameType.QuizEmojis && (
                <ThemedText style={{ marginVertical: 10 }}>
                    Retrouvez dans quelle chanson se trouve ce refrain en
                    émojis&nbsp;:
                </ThemedText>
            )}

            {currentGame.content5 === GameType.QuizEmojis ? (
                <CustomMarkdown
                    style={{
                        fontSize: 26,
                        lineHeight: 48,
                        alignSelf: "center",
                    }}
                >
                    {currentGame.content1}
                </CustomMarkdown>
            ) : (
                <CustomMarkdown style={{ marginVertical: 20 }}>
                    {currentGame.content1}
                </CustomMarkdown>
            )}

            <QuizAnswers
                currentGame={currentGame}
                answers={answers}
                selectedAnswer={selectedAnswer}
                handleAnswer={handleAnswer}
                answerButtonIsDisabled={answerButtonIsDisabled}
            />

            {selectedAnswer !== null && (
                <QuizExplanation
                    games={games}
                    currentGame={currentGame}
                    selectedAnswer={selectedAnswer}
                    currentQuestionIndex={currentQuestionIndex}
                    handleNextQuestion={handleNextQuestion}
                />
            )}
        </>
    );
};
