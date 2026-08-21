import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserScoresByDay, getScoreSummary } from "@/services/score.service";
import { Score } from "@/interfaces/scoreInterface";

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

    const refreshScores = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [scores, summary] = await Promise.all([
                getUserScoresByDay(),
                getScoreSummary(),
            ]);
            setScoreHistory(Array.isArray(scores) ? scores : []);
            setScoreTotal(summary.totalScore ?? 0);
            setPreviousYearScore(summary.previousYearScore ?? 0);
        } catch (err: any) {
            console.error("Erreur loading scores:", err);
            setError(
                "Impossible de charger les scores... Vérifiez votre connexion Internet."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshScores();
    }, [refreshScores]);

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
        ]
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
