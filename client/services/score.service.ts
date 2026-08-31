import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameState, Score } from "@/interfaces/scoreInterface";
import { apiFetch } from "@/services/apiFetch";
import { StorageKeys } from "@/constants/storageKeys";

export const saveScore = async (
    dayId: number | null,
    points: number,
    reason: string,
    itemNumber?: number,
): Promise<void> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);

    await apiFetch("/scores", {
        method: "POST",
        body: { userUuid, dayId, points, reason, itemNumber },
    });
};

interface PendingScore {
    id: string;
    dayId: number | null;
    points: number;
    reason: string;
    itemNumber?: number;
}

const loadPendingScores = async (): Promise<PendingScore[]> => {
    const json = await AsyncStorage.getItem(StorageKeys.pendingScores);
    return json ? JSON.parse(json) : [];
};

const savePendingScores = async (queue: PendingScore[]): Promise<void> => {
    await AsyncStorage.setItem(
        StorageKeys.pendingScores,
        JSON.stringify(queue),
    );
    notifyPendingScoresChanged();
};

// Lets ScoreContext know the pending queue moved (an entry was added, or
// some were confirmed and dropped) so it can keep an optimistic total in
// sync without polling - see getPendingPointsTotal below.
type PendingScoresListener = () => void;
const pendingScoresListeners = new Set<PendingScoresListener>();

export const subscribeToPendingScores = (
    listener: PendingScoresListener,
): (() => void) => {
    pendingScoresListeners.add(listener);
    return () => pendingScoresListeners.delete(listener);
};

const notifyPendingScoresChanged = (): void => {
    pendingScoresListeners.forEach((listener) => listener());
};

// Sum of points not yet confirmed by the server - what to optimistically
// add on top of the last confirmed total so it doesn't look stale while
// offline (see ScoreContext).
export const getPendingPointsTotal = async (): Promise<number> => {
    const queue = await loadPendingScores();
    return queue.reduce((sum, entry) => sum + entry.points, 0);
};

export const queueScore = async (
    dayId: number | null,
    points: number,
    reason: string,
    itemNumber?: number,
): Promise<void> => {
    const entry: PendingScore = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        dayId,
        points,
        reason,
        itemNumber,
    };
    const queue = await loadPendingScores();
    queue.push(entry);
    await savePendingScores(queue);

    await flushPendingScores();
};

let flushInFlight: Promise<boolean> | null = null;

// Retries every not-yet-confirmed score, oldest first.
export const flushPendingScores = (): Promise<boolean> => {
    flushInFlight ??= (async (): Promise<boolean> => {
        try {
            const queue = await loadPendingScores();
            if (queue.length === 0) return false;

            const remaining: PendingScore[] = [];
            let anyConfirmed = false;
            for (const entry of queue) {
                try {
                    await saveScore(
                        entry.dayId,
                        entry.points,
                        entry.reason,
                        entry.itemNumber,
                    );
                    anyConfirmed = true;
                } catch {
                    remaining.push(entry); // still not confirmed - try again later
                }
            }
            await savePendingScores(remaining);
            return anyConfirmed;
        } finally {
            flushInFlight = null;
        }
    })();
    return flushInFlight;
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

export type LeaderboardPage = {
    data: LeaderboardEntry[];
    total: number;
    hasMore: boolean;
};

export const getLeaderboard = async (
    page: number,
    limit: number,
): Promise<LeaderboardPage> => {
    return apiFetch(`/scores/leaderboard?page=${page}&limit=${limit}`);
};

export type LeaderboardAroundResponse =
    | { userHasScore: false }
    | {
          userHasScore: true;
          userRank: number;
          total: number;
          hasMoreAbove: boolean;
          hasMoreBelow: boolean;
          data: (LeaderboardEntry & { rank: number })[];
      };

export const getLeaderboardAround = async (
    before: number,
    after: number,
): Promise<LeaderboardAroundResponse> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (!userUuid) return { userHasScore: false };

    return apiFetch(
        `/scores/leaderboard/around/${userUuid}?before=${before}&after=${after}`,
    );
};

export const saveItemScored = async (
    day: number,
    reason: string,
    itemNumber: number,
): Promise<void> => {
    const json = await AsyncStorage.getItem(StorageKeys.gameState);
    const gameState: GameState = json ? JSON.parse(json) : {};

    if (!gameState[day]) gameState[day] = {};
    if (!gameState[day][reason]) gameState[day][reason] = {};
    gameState[day][reason][itemNumber] = true;

    await AsyncStorage.setItem(
        StorageKeys.gameState,
        JSON.stringify(gameState),
    );
};

export const isItemScored = async (
    day: number,
    reason: string,
    itemNumber: number,
): Promise<boolean> => {
    const json = await AsyncStorage.getItem(StorageKeys.gameState);
    const gameState: GameState = json ? JSON.parse(json) : {};

    return gameState[day]?.[reason]?.[itemNumber] ?? false;
};

export const getAnsweredQuestionsCount = async (
    day: number,
    reason: string,
): Promise<number> => {
    const json = await AsyncStorage.getItem(StorageKeys.gameState);
    const gameState: GameState = json ? JSON.parse(json) : {};

    return Object.values(gameState[day]?.[reason] ?? {}).filter(Boolean).length;
};
