import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { QuizAnswers } from "@/components/content/games/quiz/QuizAnswers";
import { QuizExplanation } from "@/components/content/games/quiz/QuizExplanation";
import { Content } from "@/interfaces/contentInterface";
import { GameType } from "@/enums/enums";

interface QuizProps {
    content: Content;
    setScore: (questionNumber: number, isCorrect: boolean) => Promise<void>;
}

export const Quiz: React.FC<QuizProps> = ({ content, setScore }) => {
    const questions = content.listOfContents ?? [];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const currentQuestion = questions[currentQuestionIndex];
    const answers = currentQuestion.answers?.split(",") || [];
    const [answerButtonIsDisabled, setAnswerButtonIsDisabled] =
        useState<boolean>(false);

    const handleAnswer = async (answer: string) => {
        setSelectedAnswer(answer);
        setAnswerButtonIsDisabled(true);

        const isCorrect = answer === currentQuestion.correctAnswer;
        setScore(currentQuestionIndex, isCorrect);
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswerButtonIsDisabled(false);
        setCurrentQuestionIndex(
            (prevIndex) => (prevIndex + 1) % questions.length,
        );
    };

    return (
        <>
            {content.subType === GameType.QuizEmojis && (
                <ThemedText style={{ marginVertical: 10 }}>
                    Retrouvez dans quelle chanson se trouve ce refrain en
                    émojis&nbsp;:
                </ThemedText>
            )}

            {content.subType === GameType.QuizEmojis ? (
                <CustomMarkdown
                    style={{
                        fontSize: 26,
                        lineHeight: 48,
                        alignSelf: "center",
                    }}
                >
                    {currentQuestion.title}
                </CustomMarkdown>
            ) : (
                <CustomMarkdown style={{ marginVertical: 20 }}>
                    {currentQuestion.title}
                </CustomMarkdown>
            )}

            <QuizAnswers
                correctAnswer={currentQuestion.correctAnswer || ""}
                answers={answers}
                selectedAnswer={selectedAnswer}
                handleAnswer={handleAnswer}
                answerButtonIsDisabled={answerButtonIsDisabled}
            />

            {selectedAnswer !== null && (
                <QuizExplanation
                    subType={content.subType}
                    correctAnswer={currentQuestion.correctAnswer || ""}
                    explanation={currentQuestion.description}
                    videoId={currentQuestion.url}
                    selectedAnswer={selectedAnswer}
                    totalQuestions={questions.length}
                    currentQuestionIndex={currentQuestionIndex}
                    handleNextQuestion={handleNextQuestion}
                />
            )}
        </>
    );
};
