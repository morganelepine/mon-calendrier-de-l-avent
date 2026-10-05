export type LetterStatus = "correct" | "present" | "absent";

// Uppercase and strip accents, spaces and dashes
// so "Étoile" can be guessed with a plain A-Z keyboard.
export const normalizeWord = (word: string): string =>
    word
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^A-Za-z]/g, "")
        .toUpperCase();

// Two passes so duplicate letters are handled like Wordle:
// exact matches are claimed first, then misplaced letters only count
// while the answer still has unclaimed occurrences of them.
export const evaluateGuess = (
    guess: string,
    answer: string,
): LetterStatus[] => {
    const result: LetterStatus[] = guess.split("").map(() => "absent");
    const remaining: Record<string, number> = {};

    guess.split("").forEach((letter, index) => {
        if (letter === answer[index]) {
            result[index] = "correct";
        } else {
            remaining[answer[index]] = (remaining[answer[index]] ?? 0) + 1;
        }
    });

    guess.split("").forEach((letter, index) => {
        if (result[index] === "correct") return;
        if ((remaining[letter] ?? 0) > 0) {
            result[index] = "present";
            remaining[letter] -= 1;
        }
    });

    return result;
};

const STATUS_RANK: Record<LetterStatus, number> = {
    absent: 0,
    present: 1,
    correct: 2,
};

// Best status seen for each letter across all guesses: drives the keyboard colors.
export const getKeyboardStatuses = (
    guesses: string[],
    answer: string,
): Record<string, LetterStatus> => {
    const statuses: Record<string, LetterStatus> = {};

    guesses.forEach((guess) => {
        evaluateGuess(guess, answer).forEach((status, index) => {
            const letter = guess[index];
            const current = statuses[letter];
            if (!current || STATUS_RANK[status] > STATUS_RANK[current]) {
                statuses[letter] = status;
            }
        });
    });

    return statuses;
};
