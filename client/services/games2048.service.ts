import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/services/apiFetch";
import { StorageKeys } from "@/constants/storageKeys";
import {
    Games2048InProgressState,
    Games2048LeaderboardAroundResponse,
    Games2048LeaderboardEntry,
    Games2048Stats,
    SubmitScoreResponse,
} from "@/interfaces/games2048Interface";

// The server independently recomputes its own playDate from its own clock
// when a score is submitted, so a mismatched device clock can't be used to
// submit for a different day than the one the server thinks it is.
export const todayPlayDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const submitGames2048Score = async (
    score: number,
    won: boolean,
): Promise<SubmitScoreResponse | null> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (!userUuid) return null;

    return apiFetch<SubmitScoreResponse>("/games/2048/score", {
        method: "POST",
        body: { userUuid, score, won },
    });
};

export type Games2048LeaderboardPage = {
    data: Games2048LeaderboardEntry[];
    total: number;
    hasMore: boolean;
};

export const getGames2048Leaderboard = async (
    page: number,
    limit: number,
    playDate: string = todayPlayDate(),
    groupId?: number,
): Promise<Games2048LeaderboardPage> => {
    const groupParam = groupId ? `&groupId=${groupId}` : "";
    return apiFetch(
        `/games/2048/leaderboard?playDate=${playDate}&page=${page}&limit=${limit}${groupParam}`,
    );
};

export const getGames2048LeaderboardAround = async (
    before: number,
    after: number,
    playDate: string = todayPlayDate(),
    groupId?: number,
): Promise<Games2048LeaderboardAroundResponse> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (!userUuid) return { userHasScore: false };

    const groupParam = groupId ? `&groupId=${groupId}` : "";
    return apiFetch(
        `/games/2048/leaderboard/around/${userUuid}?playDate=${playDate}&before=${before}&after=${after}${groupParam}`,
    );
};

export const getGames2048Stats = async (): Promise<Games2048Stats | null> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (!userUuid) return null;

    return apiFetch<Games2048Stats>(`/games/2048/stats/${userUuid}`);
};

export const saveGames2048InProgress = async (
    state: Games2048InProgressState,
): Promise<void> => {
    await AsyncStorage.setItem(
        StorageKeys.game2048InProgress,
        JSON.stringify(state),
    );
};

export const loadGames2048InProgress =
    async (): Promise<Games2048InProgressState | null> => {
        const json = await AsyncStorage.getItem(StorageKeys.game2048InProgress);
        if (!json) return null;

        const state: Games2048InProgressState = JSON.parse(json);
        // Stale - belongs to a previous day, don't resume it.
        if (state.playDate !== todayPlayDate()) return null;

        return state;
    };
