import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Board,
    Direction,
    createInitialBoard,
    getMaxTier,
    hasMovesLeft,
    hasReachedMaxTier,
    move as applyMove,
    spawnTile,
} from "@/utils/games2048/engine";
import {
    getGames2048Stats,
    loadGames2048InProgress,
    saveGames2048InProgress,
    submitGames2048Score,
} from "@/services/activities/games2048.service";
import { completeChallenge } from "@/services/challenge.service";
import useAppState from "@/hooks/useAppState";
import { usePremium } from "@/contexts/PremiumContext";
import { isOctober } from "@/constants/Dates";
import { StorageKeys } from "@/constants/storageKeys";
import { CHALLENGE_2048_SCORE } from "@/data/challenges_data";
import { ChallengeId } from "@/enums/enums";

type Status = "loading" | "playing" | "gameover";

interface GameData {
    board: Board;
    score: number;
    hasWon: boolean;
    status: Status;
    scoreSubmitted: boolean;
}

interface UseGame2048Result {
    board: Board;
    score: number;
    bestScore: number;
    status: Status;
    hasJustWon: boolean;
    dismissWin: () => void;
    isNewBest: boolean | null;
    maxTier: number;
    play: (direction: Direction) => void;
    startNewGame: () => void;
}

const IS_PWA = Platform.OS === "web";

export function useGame2048(): UseGame2048Result {
    const { isPremium } = usePremium();
    const maxTier = getMaxTier(isPremium || IS_PWA);
    const [, forceRender] = useReducer((c) => c + 1, 0);
    const [isNewBest, setIsNewBest] = useState<boolean | null>(null);
    const [hasJustWon, setHasJustWon] = useState(false);
    const [bestScore, setBestScore] = useState(0);
    const bestScoreRef = useRef(0);
    const gameRef = useRef<GameData>({
        board: [],
        score: 0,
        hasWon: false,
        status: "loading",
        scoreSubmitted: false,
    });
    // Guards against overlapping submit attempts (e.g. app-foreground retry
    // firing while the game-over submit is still in flight).
    const isSubmittingRef = useRef(false);
    const appState = useAppState();

    const updateBestScore = useCallback((candidate: number): void => {
        if (candidate <= bestScoreRef.current) return;
        bestScoreRef.current = candidate;
        setBestScore(candidate);
    }, []);

    const persist = useCallback((): void => {
        const game = gameRef.current;
        void saveGames2048InProgress({
            board: game.board,
            score: game.score,
            hasWon: game.hasWon,
            status: game.status === "gameover" ? "gameover" : "playing",
            scoreSubmitted: game.scoreSubmitted,
        });
    }, []);

    // Best-effort submit of the current game's final score. Safe to call
    // more than once: it no-ops if already submitted or already in flight,
    // and the server only ever keeps the higher score anyway, so retrying
    // an already-confirmed submission can never regress it.
    const attemptSubmit = useCallback(
        (score: number): void => {
            if (gameRef.current.scoreSubmitted || isSubmittingRef.current) {
                return;
            }
            isSubmittingRef.current = true;

            submitGames2048Score(score)
                .then((response) => {
                    if (!response) return; // no user uuid yet - retry later
                    gameRef.current = {
                        ...gameRef.current,
                        scoreSubmitted: true,
                    };
                    persist();
                    setIsNewBest(response.isNewBest);
                    updateBestScore(response.result.score);
                })
                .catch(() => {
                    // Network/server failure: scoreSubmitted stays false, so
                    // the next load or app-foreground retry will try again.
                })
                .finally(() => {
                    isSubmittingRef.current = false;
                });
        },
        [persist, updateBestScore],
    );

    const startNewGame = useCallback((): void => {
        gameRef.current = {
            board: createInitialBoard(Math.random),
            score: 0,
            hasWon: false,
            status: "playing",
            scoreSubmitted: false,
        };
        setIsNewBest(null);
        setHasJustWon(false);
        persist();
        forceRender();
    }, [persist]);

    useEffect((): void => {
        getGames2048Stats()
            .then((stats) => updateBestScore(stats?.bestScore ?? 0))
            .catch(() => {
                // Best-effort - the game is still playable without it.
            });
    }, [updateBestScore]);

    // Resumes whatever board was left, however long ago.
    // There's no daily reset to invalidate it.
    useEffect((): void => {
        (async (): Promise<void> => {
            const saved = await loadGames2048InProgress();
            if (saved) {
                gameRef.current = {
                    board: saved.board,
                    score: saved.score,
                    hasWon: saved.hasWon,
                    status: saved.status,
                    scoreSubmitted: saved.scoreSubmitted ?? false,
                };
                forceRender();
                if (saved.status === "gameover" && !saved.scoreSubmitted) {
                    updateBestScore(saved.score);
                    attemptSubmit(saved.score);
                }
            } else {
                startNewGame();
            }
        })();
    }, [startNewGame, attemptSubmit, updateBestScore]);

    // Retry an unsent score whenever the app comes back to the foreground -
    // the most likely moment for connectivity to have returned.
    useEffect((): void => {
        const game = gameRef.current;
        if (
            appState === "active" &&
            game.status === "gameover" &&
            !game.scoreSubmitted
        ) {
            updateBestScore(game.score);
            attemptSubmit(game.score);
        }
    }, [appState, attemptSubmit, updateBestScore]);

    const play = useCallback(
        (direction: Direction): void => {
            const game = gameRef.current;
            if (game.status !== "playing") return;

            const result = applyMove(game.board, direction, maxTier);
            if (!result.moved) return; // blocked edge, nothing to do

            const boardWithNewTile = spawnTile(result.board, Math.random);
            const nextScore = game.score + result.scoreGained;
            const hasWon =
                game.hasWon || hasReachedMaxTier(boardWithNewTile, maxTier);
            const isOver = !hasMovesLeft(boardWithNewTile, maxTier);

            gameRef.current = {
                board: boardWithNewTile,
                score: nextScore,
                hasWon,
                status: isOver ? "gameover" : "playing",
                scoreSubmitted: false,
            };
            persist();
            // Only shown the first time the goal is ever reached on this device
            if (hasWon && !game.hasWon) {
                AsyncStorage.getItem(StorageKeys.game2048WinSeen)
                    .then((winSeen) => {
                        if (winSeen === "true") return;
                        setHasJustWon(true);
                        void AsyncStorage.setItem(
                            StorageKeys.game2048WinSeen,
                            "true",
                        );
                    })
                    .catch(() => {
                        // Best-effort - the popup is only informative.
                    });
            }
            forceRender();

            if (
                game.score < CHALLENGE_2048_SCORE &&
                nextScore >= CHALLENGE_2048_SCORE
            ) {
                void completeChallenge(ChallengeId.Game2048Score);
            }

            if (isOver) {
                const wasNewBest = nextScore > bestScoreRef.current;
                setIsNewBest(wasNewBest);
                if (wasNewBest) updateBestScore(nextScore);
                attemptSubmit(nextScore);
            }
        },
        [persist, attemptSubmit, updateBestScore, maxTier],
    );

    const dismissWin = useCallback((): void => setHasJustWon(false), []);

    const game = gameRef.current;
    return {
        board: game.board,
        score: game.score,
        bestScore,
        status: game.status,
        hasJustWon,
        dismissWin,
        isNewBest,
        maxTier,
        play,
        startNewGame,
    };
}

export const useGoalForCurrentSeason = (): string => {
    const { isPremium } = usePremium();
    const octoberGoal =
        isPremium || IS_PWA ? "le chaudron magique !" : "la courge 🎃";
    const decemberGoal =
        isPremium || IS_PWA ? "le Père Noël 🎅" : "la couronne de Noël !";
    return isOctober ? octoberGoal : decemberGoal;
};
