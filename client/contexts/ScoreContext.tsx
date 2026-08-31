import React, { createContext, useContext, useState, useEffect } from "react";
import {
    getUserScoresByDay,
    getScoreSummary,
    flushPendingScores,
} from "@/services/score.service";
import { Score } from "@/interfaces/scoreInterface";
import useAppState from "@/hooks/useAppState";

type ScoreContextType = {
    scoreTotal: number;
    previousYearScore: number;
    scoreHistory: Score[];
    loading: boolean;
    error: string | null;
    refreshScores: () => Promise<void>;
};

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

    const refreshScores = React.useCallback(async () => {
        if (!loadedOnceRef.current) {
            setLoading(true);
        }
        setError(null);
        try {
            const [scores, summary] = await Promise.all([
                getUserScoresByDay(),
                getScoreSummary(),
            ]);
            setScoreHistory(Array.isArray(scores) ? scores : []);
            setScoreTotal(summary.totalScore ?? 0);
            setPreviousYearScore(summary.previousYearScore ?? 0);
            loadedOnceRef.current = true;
        } catch (error) {
            console.error("Erreur loading scores:", error);
            setError(
                "Impossible de charger les scores... Vérifiez votre connexion Internet.",
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshScores();
    }, [refreshScores]);

    // Retries any score that couldn't reach the server yet,
    // on app launch and every time the app comes back to the foreground.
    // Only refreshes the displayed total when something was actually confirmed.
    const appState = useAppState();
    useEffect(() => {
        if (appState !== "active") return;
        flushPendingScores()
            .then((hasConfirmed) => {
                if (hasConfirmed) refreshScores();
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
        }),
        [
            scoreTotal,
            previousYearScore,
            scoreHistory,
            loading,
            error,
            refreshScores,
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
