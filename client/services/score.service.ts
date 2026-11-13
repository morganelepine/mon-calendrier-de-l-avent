import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameState, Score } from "@/interfaces/scoreInterface";
import { apiFetch } from "@/services/apiFetch";
import { StorageKeys } from "@/constants/storageKeys";

// When points were last actually awarded. A user's scores only change through
// their own device's actions, so the scores screen can skip refetching until then.
let lastAwardAt = 0;
export const getLastAwardAt = (): number => lastAwardAt;

// Resolves with true when the server actually awarded the points,
// false when they had already been awarded.
export const saveScore = async (
    dayId: number | null,
    points: number,
    reason: string,
    itemNumber?: number,
): Promise<boolean> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);

    const { alreadyAwarded } = await apiFetch<{ alreadyAwarded?: boolean }>(
        "/scores",
        {
            method: "POST",
            body: { userUuid, dayId, points, reason, itemNumber },
        },
    );
    if (!alreadyAwarded) lastAwardAt = Date.now();
    return !alreadyAwarded;
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
// Resolves with true only if some points were actually awarded,
// so callers don't refetch the scores for nothing.
export const flushPendingScores = (): Promise<boolean> => {
    flushInFlight ??= (async (): Promise<boolean> => {
        try {
            const queue = await loadPendingScores();
            if (queue.length === 0) return false;

            const remaining: PendingScore[] = [];
            let anyAwarded = false;
            for (const entry of queue) {
                try {
                    const awarded = await saveScore(
                        entry.dayId,
                        entry.points,
                        entry.reason,
                        entry.itemNumber,
                    );
                    if (awarded) anyAwarded = true;
                } catch {
                    remaining.push(entry); // still not confirmed - try again later
                }
            }
            await savePendingScores(remaining);
            return anyAwarded;
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

// Off season, the scores screen only shows last season's total, which can no
// longer change: fetched once, then cached for the rest of the calendar year.
export const getPreviousYearScore = async (): Promise<number> => {
    const year = new Date().getFullYear();
    const cached = await AsyncStorage.getItem(StorageKeys.previousYearScore);
    if (cached) {
        const parsed = JSON.parse(cached) as { year: number; score: number };
        if (parsed.year === year) return parsed.score;
    }

    const { previousYearScore } = await getScoreSummary();
    await AsyncStorage.setItem(
        StorageKeys.previousYearScore,
        JSON.stringify({ year, score: previousYearScore }),
    );
    return previousYearScore;
};

export const checkIn = async (day: number): Promise<number> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);

    const { bonusAwarded } = await apiFetch<{ bonusAwarded: number }>(
        "/scores/check-in",
        {
            method: "POST",
            body: { userUuid, day },
        },
    );
    return bonusAwarded;
};

// Premium: hangs a missed day's bauble. Resolves with the jokers left.
export const spendCheckInJoker = async (
    day: number,
    today: number,
): Promise<number> => {
    const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);

    const { jokersLeft } = await apiFetch<{ jokersLeft: number }>(
        "/scores/check-in/joker",
        {
            method: "POST",
            body: { userUuid, day, today },
        },
    );
    return jokersLeft;
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
