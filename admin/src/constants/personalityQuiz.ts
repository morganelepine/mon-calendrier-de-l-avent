export function validatePersonalityQuiz(json: string): string | null {
    let quiz;
    try {
        quiz = JSON.parse(json);
    } catch (e) {
        return `JSON invalide : ${(e as Error).message}`;
    }

    if (!quiz?.profiles || typeof quiz.profiles !== "object") {
        return 'Il manque l\'objet "profiles".';
    }
    for (const [key, profile] of Object.entries<{
        title?: unknown;
        description?: unknown;
    }>(quiz.profiles)) {
        if (typeof profile?.title !== "string" || !profile.title) {
            return `Profil "${key}" : titre manquant.`;
        }
        if (typeof profile.description !== "string") {
            return `Profil "${key}" : description manquante.`;
        }
    }

    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        return 'Il manque la liste "questions".';
    }
    for (const [i, question] of quiz.questions.entries()) {
        const label = `Question ${i + 1}`;
        if (typeof question?.question !== "string" || !question.question) {
            return `${label} : texte manquant.`;
        }
        if (!Array.isArray(question.answers) || question.answers.length < 2) {
            return `${label} : il faut au moins 2 réponses.`;
        }
        for (const answer of question.answers) {
            if (typeof answer?.text !== "string" || !answer.text) {
                return `${label} : une réponse n'a pas de texte.`;
            }
            if (!Array.isArray(answer.profiles)) {
                return `${label} : "${answer.text}" n'a pas de "profiles".`;
            }
            const unknown = answer.profiles.find(
                (key: string) => !(key in quiz.profiles),
            );
            if (unknown) {
                return `${label} : profil inconnu "${unknown}".`;
            }
        }
    }

    return null;
}

// Best score each profile can reach over the whole quiz.
export function countProfilePoints(json: string): [string, number][] {
    const quiz = JSON.parse(json);
    const counts: Record<string, number> = Object.fromEntries(
        Object.keys(quiz.profiles).map((key) => [key, 0]),
    );
    for (const question of quiz.questions) {
        const questionMax: Record<string, number> = {};
        for (const answer of question.answers) {
            for (const key of answer.profiles) {
                questionMax[key] = Math.max(
                    questionMax[key] ?? 0,
                    1 / answer.profiles.length,
                );
            }
        }
        for (const [key, value] of Object.entries(questionMax)) {
            counts[key] += value;
        }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

// A profile on two answers of the same question can only score once there,
// so the second one is wasted - worth a warning, not a blocking error.
export function findDuplicateProfiles(json: string): string[] {
    const quiz = JSON.parse(json);
    const warnings: string[] = [];
    quiz.questions.forEach(
        (question: { answers: { profiles: string[] }[] }, i: number) => {
            const keys = question.answers.flatMap((answer) => answer.profiles);
            const duplicates = new Set(
                keys.filter((key, j) => keys.indexOf(key) !== j),
            );
            duplicates.forEach((key) =>
                warnings.push(`Question ${i + 1} : "${key}" sur 2 réponses`),
            );
        },
    );
    return warnings;
}
