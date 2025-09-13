import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameState } from "@/interfaces/scoreInterfaces";

const BASE_URL = "http://192.168.1.18:3000/scores";

export const saveScore = async (
    dayId: number | null,
    points: number,
    reason: string,
    questionNumber?: number
): Promise<void> => {
    try {
        const userUuid = await AsyncStorage.getItem("userUuid");
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userUuid: userUuid,
                dayId,
                points,
                reason,
                questionNumber,
            }),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to save score: ${errorMessage}`);
        }
    } catch (error) {
        console.log("Error saving score:", error);
    }
};

export const getTotalScore = async (): Promise<number | undefined> => {
    try {
        const userUuid = await AsyncStorage.getItem("userUuid");
        const response = await fetch(`${BASE_URL}/total/user/${userUuid}`);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to save score: ${errorMessage}`);
        }
        const data = await response.json();
        return data.totalScore;
    } catch (error) {
        console.log("Error getting total score:", error);
        return undefined;
    }
};

export const getUserScoresByDay = async (): Promise<number | undefined> => {
    try {
        const userUuid = await AsyncStorage.getItem("userUuid");
        const response = await fetch(`${BASE_URL}/user/${userUuid}`);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to save score: ${errorMessage}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting scores by day:", error);
        return undefined;
    }
};

export const saveQuestionPlayed = async (
    day: number,
    questionNumber: number
): Promise<void> => {
    const json = await AsyncStorage.getItem("gameState");
    const gameState: GameState = json ? JSON.parse(json) : {};

    if (!gameState[day]) gameState[day] = {};
    gameState[day][questionNumber] = true;

    await AsyncStorage.setItem("gameState", JSON.stringify(gameState));
};

export const isQuestionPlayed = async (day: number, questionNumber: number) => {
    const json = await AsyncStorage.getItem("gameState");
    const gameState: GameState = json ? JSON.parse(json) : {};

    return gameState[day]?.[questionNumber] ?? false;
};
