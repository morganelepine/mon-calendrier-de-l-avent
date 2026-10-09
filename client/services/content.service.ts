import { StyleSheet } from "react-native";
import { getAllContents } from "@/services/contents.service";
import { Content } from "@/interfaces/contentInterface";
import { ContentType, GameType, Season } from "@/enums/enums";
import { isOctober } from "@/constants/Dates";
import { Colors, Theme } from "@/constants/Colors";

interface GamesByType {
    hangman?: Content;
    wordle?: Content;
    inputGame?: Content;
    quiz?: Content;
}

interface DayContents {
    anecdote: Content | undefined;
    story: Content | undefined;
    ideas: Content[];
    games: Content[];
}

const contentSeason = (content: Content): string =>
    content.season ?? Season.Christmas;

const CURRENT_SEASON: string = isOctober ? Season.Halloween : Season.Christmas;

// Fetched once per app session (all 120 rows are small), then reused
// synchronously by every screen that asks for a given day's content.
// On failure the promise is cleared so the next call retries instead of
// being stuck on a rejection (or an empty result) for the whole session.
let contentsPromise: Promise<Content[]> | null = null;
const getCachedContents = (): Promise<Content[]> => {
    contentsPromise ??= getAllContents().catch((error) => {
        contentsPromise = null;
        throw error;
    });
    return contentsPromise;
};

export const prefetchContents = (): void => {
    // Fire-and-forget: this is just a warm-up, the actual consumers
    // (getContentsByDay callers) handle success/failure themselves.
    getCachedContents().catch(() => {});
};

export const getContentsByDay = async (dayId: number): Promise<DayContents> => {
    const allContents = await getCachedContents();
    const contentsThisSeason = allContents.filter(
        (content) => contentSeason(content) === CURRENT_SEASON,
    );

    const anecdote: Content | undefined = contentsThisSeason.find(
        (content) =>
            content.type === ContentType.Anecdote &&
            content.dayNumber === dayId,
    );

    const story: Content | undefined = contentsThisSeason.find(
        (content) =>
            content.type === ContentType.Story && content.dayNumber === dayId,
    );

    const ideas: Content[] = contentsThisSeason.filter(
        (content) =>
            content.type === ContentType.Idea && content.dayNumber === dayId,
    );

    const games: Content[] = contentsThisSeason.filter(
        (content) =>
            content.type === ContentType.Game && content.dayNumber === dayId,
    );

    return {
        anecdote,
        story,
        ideas,
        games,
    };
};

export const getContentTitle = (
    content: Content,
    ideas: Content[],
    games: Content[],
): string => {
    if (ideas.length > 0) {
        return "Se divertir";
    }
    if (games.length > 0) {
        return "S'amuser";
    }
    switch (content.type) {
        case ContentType.Story:
            return "S'inspirer";
        case ContentType.Anecdote:
            return "S'instruire";
        default:
            return "Contenu du jour";
    }
};

export const classifyGames = (
    games: Content[],
): {
    gamesByType: GamesByType;
    type: string;
} => {
    const gamesByType: GamesByType = {};

    let type = "";

    games.forEach((game) => {
        switch (game.subType) {
            case GameType.Hangman:
                gamesByType.hangman = game;
                type = ContentType.Game;
                break;
            case GameType.Wordle:
                gamesByType.wordle = game;
                type = ContentType.Game;
                break;
            case GameType.InputGame:
                gamesByType.inputGame = game;
                type = ContentType.Game;
                break;
            case GameType.QuizCitation:
            case GameType.QuizNoel:
            case GameType.QuizEmojis:
            case GameType.QuizHalloween:
                gamesByType.quiz = game;
                type = ContentType.Quiz;
                break;
        }
    });

    return { gamesByType, type };
};

type ButtonStyles = {
    buttonStyle: (object | null)[];
    textStyle: {
        color: string;
        fontSize: number;
        textAlign?: string;
    };
};

export const getButtonStyles = (
    answer: string,
    selectedAnswer: string | null,
    goodAnswer: string,
    isCard = false,
): ButtonStyles => {
    const isCorrect = answer.trim() === goodAnswer.trim();
    const isSelected = selectedAnswer !== null;

    if (isCard) {
        const isRevealedCorrect = isSelected && isCorrect;
        return {
            buttonStyle: [
                styles.card,
                isRevealedCorrect ? styles.cardIsCorrect : null,
                isSelected && !isCorrect ? styles.cardIsNotCorrect : null,
            ],
            textStyle: {
                color: isRevealedCorrect ? Colors.snow : Colors.darkGreen,
                fontSize: 15,
                textAlign: "left",
            },
        };
    }

    let color;
    if (isCorrect) {
        color = Colors.snow;
    } else {
        color = isSelected ? Theme.orangeToGreen : Colors.snow;
    }

    return {
        buttonStyle: [
            styles.answer,
            isSelected && !isCorrect ? styles.isNotCorrect : null,
        ],
        textStyle: {
            color: color,
            fontSize: 16,
            textAlign: "center",
        },
    };
};

const styles = StyleSheet.create({
    answer: {
        backgroundColor: Theme.autumnGreenDarkToGreen,
        marginVertical: 5,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 48,
    },
    isNotCorrect: {
        backgroundColor: Colors.snow,
        color: Theme.orangeToGreen,
        opacity: 0.4,
        borderColor: Theme.orangeToGreen,
        borderWidth: 0.6,
    },
    card: {
        marginVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Theme.autumnGreenDarkToGreen,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    cardIsCorrect: {
        backgroundColor: Theme.autumnGreenDarkToGreen,
    },
    cardIsNotCorrect: {
        opacity: 0.4,
    },
});
