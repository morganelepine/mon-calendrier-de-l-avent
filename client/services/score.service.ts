import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameState, Score } from "@/interfaces/scoreInterface";
import { apiFetch } from "@/services/apiFetch";
import { StorageKeys } from "@/constants/storageKeys";

export const saveScore = async (
    dayId: number | null,
    points: number,
    reason: string,
    questionNumber?: number
): Promise<void> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);

    await apiFetch("/scores", {
        method: "POST",
        body: { userUuid, dayId, points, reason, questionNumber },
    });
};

export type ScoreSummary = {
    totalScore: number;
    previousYearScore: number;
};

export const getScoreSummary = async (): Promise<ScoreSummary> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (!userUuid) return { totalScore: 0, previousYearScore: 0 };

    return apiFetch<ScoreSummary>(`/scores/total/user/${userUuid}`);
};

export const getTotalScore = async (): Promise<number> => {
    const { totalScore } = await getScoreSummary();
    return totalScore;
};

export const getUserScoresByDay = async (): Promise<Score[]> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (!userUuid) return [];

    return apiFetch<Score[]>(`/scores/user/${userUuid}`);
};

type LeaderboardEntry = { username: string; score: number };

export const getLeaderboard = async (): Promise<
    LeaderboardEntry[] | { data: LeaderboardEntry[]; total: number; hasMore: boolean }
> => {
    return apiFetch("/scores/leaderboard");
};

export const saveQuestionPlayed = async (
    day: number,
    questionNumber: number
): Promise<void> => {
    const json = await AsyncStorage.getItem(StorageKeys.gameState);
    const gameState: GameState = json ? JSON.parse(json) : {};

    if (!gameState[day]) gameState[day] = {};
    gameState[day][questionNumber] = true;

    await AsyncStorage.setItem(StorageKeys.gameState, JSON.stringify(gameState));
};

export const isQuestionPlayed = async (
    day: number,
    questionNumber: number
): Promise<boolean> => {
    const json = await AsyncStorage.getItem(StorageKeys.gameState);
    const gameState: GameState = json ? JSON.parse(json) : {};

    return gameState[day]?.[questionNumber] ?? false;
};
