import {
    PersonalityQuizAnswer,
    PersonalityQuizData,
} from "@/interfaces/contentInterface";

// Returns null on malformed JSON so a bad edit in the admin hides the quiz
// instead of crashing the screen.
export const parsePersonalityQuiz = (
    json: string,
): PersonalityQuizData | null => {
    try {
        const quiz = JSON.parse(json);
        if (
            !Array.isArray(quiz?.questions) ||
            quiz.questions.length === 0 ||
            typeof quiz.profiles !== "object"
        ) {
            return null;
        }
        return quiz;
    } catch {
        return null;
    }
};

// Each answer is worth 1 point, split between its profiles - a "solo" answer
// says more about the player than a shared one, and it makes ties much rarer.
const answerPoints = (answer: PersonalityQuizAnswer): number =>
    1 / answer.profiles.length;

// Best score each profile can reach over the whole quiz. Per question, only
// the answer giving it the most points counts, since only one can be picked.
export const computeMaxPoints = (
    quiz: PersonalityQuizData,
): Record<string, number> => {
    const maxPoints: Record<string, number> = {};
    quiz.questions.forEach((question) => {
        const questionMax: Record<string, number> = {};
        question.answers.forEach((answer) =>
            answer.profiles.forEach((key) => {
                questionMax[key] = Math.max(
                    questionMax[key] ?? 0,
                    answerPoints(answer),
                );
            }),
        );
        for (const [key, value] of Object.entries(questionMax)) {
            maxPoints[key] = (maxPoints[key] ?? 0) + value;
        }
    });
    return maxPoints;
};

// Scores are divided by the profile's max points,
// so profiles that appear less often still have a fair chance.
// Ties are broken by a hash of the chosen answers:
// no profile is favoured, and the same answers always give the same result.
export const computeProfile = (
    quiz: PersonalityQuizData,
    chosenAnswers: PersonalityQuizAnswer[],
): string | null => {
    const maxPoints = computeMaxPoints(quiz);

    const points: Record<string, number> = {};
    chosenAnswers.forEach((answer) =>
        answer.profiles.forEach((key) => {
            points[key] = (points[key] ?? 0) + answerPoints(answer);
        }),
    );

    const ratios = Object.keys(quiz.profiles)
        .filter((key) => points[key])
        .map((key) => ({ key, ratio: points[key] / maxPoints[key] }));
    if (ratios.length === 0) return null;

    const bestRatio = Math.max(...ratios.map(({ ratio }) => ratio));
    const tied = ratios
        .filter(({ ratio }) => bestRatio - ratio < 1e-9)
        .map(({ key }) => key);

    let hash = 17;
    chosenAnswers.forEach((answer, index) => {
        const answerIndex = quiz.questions[index].answers.indexOf(answer);
        hash = (hash * 31 + answerIndex + 1) % 1_000_003;
    });
    return tied[hash % tied.length];
};
