import React, { createContext, useContext, useState, useEffect } from "react";
import {
    getScoreDetails,
    getPreviousYearScore,
    getLastAwardAt,
    flushPendingScores,
} from "@/services/score.service";
import { isDecember } from "@/constants/Dates";
import { completeChallenge } from "@/services/challenge.service";
import { Score } from "@/interfaces/scoreInterface";
import useAppState from "@/hooks/useAppState";
import { getCurrentMinutes } from "@/hooks/useCurrentMinutes";
import { ChallengeId } from "@/enums/enums";
import { isBetween } from "@/utils/hours";

type ScoreContextType = {
    scoreTotal: number;
    previousYearScore: number;
    scoreHistory: Score[];
    loading: boolean;
    error: string | null;
    refreshScores: () => Promise<void>;
    refreshScoresIfStale: () => Promise<void>;
};

const MAX_SCORES_AGE_MS = 10 * 60 * 1000;

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [scoreHistory, setScoreHistory] = useState<Score[]>([]);
    const [scoreTotal, setScoreTotal] = useState<number>(0);
    const [previousYearScore, setPreviousYearScore] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // The scores screen re-triggers refreshScores() on every focus.
    // Only the very first fetch should show the full-screen loader.
    // Later ones refresh quietly in the background.
    const loadedOnceRef = React.useRef(false);
    const lastFetchAtRef = React.useRef(0);

    // Not fetched at launch: only when the scores screen asks for it.
    const refreshScores = React.useCallback(async () => {
        if (!loadedOnceRef.current) {
            setLoading(true);
        }
        setError(null);
        lastFetchAtRef.current = Date.now();
        try {
            if (isDecember) {
                const details = await getScoreDetails();
                setScoreHistory(Array.isArray(details.days) ? details.days : []);
                setScoreTotal(details.totalScore ?? 0);
                setPreviousYearScore(details.previousYearScore ?? 0);
            } else {
                // Off season, the screen only shows last season's total.
                setPreviousYearScore(await getPreviousYearScore());
            }
            loadedOnceRef.current = true;
        } catch (error) {
            lastFetchAtRef.current = 0; // retry on the next focus
            console.error("Erreur loading scores:", error);
            setError(
                "Impossible de charger les scores... Vérifiez votre connexion Internet.",
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // For the scores screen's focus: skips the network unless points were
    // awarded since the last fetch (or it's been a while, as a safety net).
    const refreshScoresIfStale = React.useCallback(async () => {
        const lastFetchAt = lastFetchAtRef.current;
        const isStale =
            !loadedOnceRef.current ||
            getLastAwardAt() >= lastFetchAt ||
            Date.now() - lastFetchAt > MAX_SCORES_AGE_MS;
        if (isStale) await refreshScores();
    }, [refreshScores]);

    // Retries any score that couldn't reach the server yet,
    // on app launch and every time the app comes back to the foreground.
    // Only refreshes the displayed total when points were actually awarded,
    // and once the scores screen has loaded them.
    const appState = useAppState();
    useEffect(() => {
        if (appState !== "active") return;
        if (isBetween(getCurrentMinutes(), "00:31", "07:00")) {
            void completeChallenge(ChallengeId.NightOpening);
        }
        flushPendingScores()
            .then((hasAwarded) => {
                if (hasAwarded && loadedOnceRef.current) void refreshScores();
            })
            .catch(() => {
                // Best-effort - it'll retry again on the next foreground.
            });
    }, [appState, refreshScores]);

    const contextValue = React.useMemo(
        () => ({
            scoreTotal,
            previousYearScore,
            scoreHistory,
            loading,
            error,
            refreshScores,
            refreshScoresIfStale,
        }),
        [
            scoreTotal,
            previousYearScore,
            scoreHistory,
            loading,
            error,
            refreshScores,
            refreshScoresIfStale,
        ],
    );

    return (
        <ScoreContext.Provider value={contextValue}>
            {children}
        </ScoreContext.Provider>
    );
};

export const useScore = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error("useScore must be used within a ScoreProvider");
    }
    return context;
};
