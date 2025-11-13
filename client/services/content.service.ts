import { StyleSheet } from "react-native";
import { anecdotesData } from "@/data/SheetToJSON.Anecdotes";
import { ideasData } from "@/data/SheetToJSON.Ideas";
import { gamesData } from "@/data/SheetToJSON.Games";
import { storyData } from "@/data/SheetToJSON.Story";
import { Content } from "@/interfaces/contentInterface";
import { ContentType, GameType } from "@/enums/enums";
import { Colors } from "@/constants/Colors";

interface GamesByType {
    pendu?: Content;
    jeu?: Content;
    quizCitation: Content[];
    quizNoel: Content[];
    quizEmojis: Content[];
}

export const getContentsByDay = (dayId: number): object => {
    const anecdote: Content | undefined = anecdotesData.find(
        (anecdote) => anecdote.dayNumber === dayId
    );

    const story: Content | undefined = storyData.find(
        (story) => story.dayNumber === dayId
    );

    const ideas: Content[] = ideasData.filter(
        (idea) => idea.dayNumber === dayId
    );

    const games: Content[] = gamesData.filter(
        (game) => game.dayNumber === dayId
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
    games: Content[]
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
        case ContentType.Word:
        case ContentType.Song:
        case ContentType.Drink:
            return "S'instruire";
        default:
            return "Contenu du jour";
    }
};

export const classifyGames = (
    games: Content[]
): {
    gamesByType: GamesByType;
    type: string;
} => {
    const gamesByType: {
        pendu?: Content;
        jeu?: Content;
        quizCitation: Content[];
        quizNoel: Content[];
        quizEmojis: Content[];
    } = { quizCitation: [], quizNoel: [], quizEmojis: [] };

    let type = "";

    games.forEach((game) => {
        switch (game.content5) {
            case GameType.Pendu:
                gamesByType.pendu = game;
                type = ContentType.Game;
                break;
            case GameType.Jeu:
                gamesByType.jeu = game;
                type = ContentType.Game;
                break;
            case GameType.QuizCitation:
                gamesByType.quizCitation.push(game);
                type = ContentType.Quiz;
                break;
            case GameType.QuizNoel:
                gamesByType.quizNoel.push(game);
                type = ContentType.Quiz;
                break;
            case GameType.QuizEmojis:
                gamesByType.quizEmojis.push(game);
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
    goodAnswer: string
): ButtonStyles => {
    const isCorrect = answer.trim() === goodAnswer.trim();
    const isSelected = selectedAnswer !== null;

    let color;
    if (isCorrect) {
        color = Colors.snow;
    } else {
        color = isSelected ? Colors.green : Colors.snow;
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
        backgroundColor: Colors.green,
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
        color: Colors.green,
        opacity: 0.4,
        borderColor: Colors.green,
        borderWidth: 0.6,
    },
});
