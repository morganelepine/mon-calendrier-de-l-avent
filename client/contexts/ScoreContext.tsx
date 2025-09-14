// context/ScoreContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserScoresByDay, getTotalScore } from "@/services/score.service";
import { Score } from "@/interfaces/scoreInterfaces";

type ScoreContextType = {
    scoreTotal: number;
    scoreHistory: Score[];
    refreshScores: () => Promise<void>;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [scoreHistory, setScoreHistory] = useState<Score[]>([]);
    const [scoreTotal, setScoreTotal] = useState<number>(0);

    const refreshScores = React.useCallback(async () => {
        const scores = await getUserScoresByDay();
        const totalScore = await getTotalScore();
        setScoreHistory(Array.isArray(scores) ? scores : []);
        setScoreTotal(typeof totalScore === "number" ? totalScore : 0);
    }, []);

    useEffect(() => {
        refreshScores();
    }, []);

    const contextValue = React.useMemo(
        () => ({ scoreTotal, scoreHistory, refreshScores }),
        [scoreTotal, scoreHistory, refreshScores]
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
