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

export const submitGames2048Score = async (
    score: number,
): Promise<SubmitScoreResponse | null> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (!userUuid) return null;

    return apiFetch<SubmitScoreResponse>("/games/2048/score", {
        method: "POST",
        body: { userUuid, score },
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
    groupId?: number,
): Promise<Games2048LeaderboardPage> => {
    const groupParam = groupId ? `&groupId=${groupId}` : "";
    return apiFetch(
        `/games/2048/leaderboard?page=${page}&limit=${limit}${groupParam}`,
    );
};

export const getGames2048LeaderboardAround = async (
    before: number,
    after: number,
    groupId?: number,
): Promise<Games2048LeaderboardAroundResponse> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (!userUuid) return { userHasScore: false };

    const groupParam = groupId ? `&groupId=${groupId}` : "";
    return apiFetch(
        `/games/2048/leaderboard/around/${userUuid}?before=${before}&after=${after}${groupParam}`,
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

// No staleness check by date on purpose: the game has no daily reset,
// a saved board stays valid until it's lost or replayed.
export const loadGames2048InProgress =
    async (): Promise<Games2048InProgressState | null> => {
        const json = await AsyncStorage.getItem(StorageKeys.game2048InProgress);
        return json ? JSON.parse(json) : null;
    };
