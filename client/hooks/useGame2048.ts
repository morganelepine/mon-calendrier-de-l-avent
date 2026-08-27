import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
    Board,
    Direction,
    createInitialBoard,
    hasMovesLeft,
    hasReachedMaxTier,
    move as applyMove,
    spawnTile,
} from "@/utils/games2048/engine";
import { createDailyRng, Rng } from "@/utils/games2048/rng";
import {
    getGames2048Stats,
    loadGames2048InProgress,
    saveGames2048InProgress,
    submitGames2048Score,
    todayPlayDate,
} from "@/services/games2048.service";

const GAME = "2048";

type Status = "loading" | "playing" | "gameover";

interface GameData {
    board: Board;
    score: number;
    hasWon: boolean;
    status: Status;
    counter: { rng: Rng; count: () => number } | null;
}

// Wraps the daily rng so it can be fast-forwarded past `skip` calls already
// consumed earlier today - resuming a saved game picks the rng stream back
// up exactly where it left off, instead of restarting it (which would reuse
// outputs already spent on tiles already on the board).
function createResumableRng(skip: number): { rng: Rng; count: () => number } {
    const base = createDailyRng(todayPlayDate(), GAME);
    for (let i = 0; i < skip; i++) base();

    let count = skip;
    const rng: Rng = () => {
        count++;
        return base();
    };
    return { rng, count: () => count };
}

interface UseGame2048Result {
    board: Board;
    score: number;
    bestScore: number;
    status: Status;
    hasWon: boolean;
    isNewBest: boolean | null;
    play: (direction: Direction) => void;
    startNewGame: () => void;
}

export function useGame2048(): UseGame2048Result {
    const [, forceRender] = useReducer((c) => c + 1, 0);
    const [isNewBest, setIsNewBest] = useState<boolean | null>(null);
    const [bestScore, setBestScore] = useState(0);
    const gameRef = useRef<GameData>({
        board: [],
        score: 0,
        hasWon: false,
        status: "loading",
        counter: null,
    });
    const submittedRef = useRef(false);

    const persist = useCallback((): void => {
        const game = gameRef.current;
        void saveGames2048InProgress({
            playDate: todayPlayDate(),
            board: game.board,
            score: game.score,
            hasWon: game.hasWon,
            rngCallCount: game.counter?.count() ?? 0,
            status: game.status === "gameover" ? "gameover" : "playing",
        });
    }, []);

    const startNewGame = useCallback((): void => {
        const counter = createResumableRng(0);
        gameRef.current = {
            board: createInitialBoard(counter.rng),
            score: 0,
            hasWon: false,
            status: "playing",
            counter,
        };
        submittedRef.current = false;
        setIsNewBest(null);
        persist();
        forceRender();
    }, [persist]);

    useEffect((): void => {
        getGames2048Stats()
            .then((stats) => setBestScore(stats?.bestScore ?? 0))
            .catch(() => {
                // Best-effort - the game is still playable without it.
            });
    }, []);

    useEffect((): void => {
        (async (): Promise<void> => {
            const saved = await loadGames2048InProgress();
            if (saved) {
                gameRef.current = {
                    board: saved.board,
                    score: saved.score,
                    hasWon: saved.hasWon,
                    status: saved.status,
                    counter: createResumableRng(saved.rngCallCount),
                };
                submittedRef.current = saved.status === "gameover";
                forceRender();
            } else {
                startNewGame();
            }
        })();
    }, [startNewGame]);

    const play = useCallback(
        (direction: Direction): void => {
            const game = gameRef.current;
            if (game.status !== "playing" || !game.counter) return;

            const result = applyMove(game.board, direction);
            if (!result.moved) return; // blocked edge, nothing to do

            const boardWithNewTile = spawnTile(result.board, game.counter.rng);
            const nextScore = game.score + result.scoreGained;
            const hasWon = game.hasWon || hasReachedMaxTier(boardWithNewTile);
            const isOver = !hasMovesLeft(boardWithNewTile);

            gameRef.current = {
                ...game,
                board: boardWithNewTile,
                score: nextScore,
                hasWon,
                status: isOver ? "gameover" : "playing",
            };
            persist();
            forceRender();

            if (isOver && !submittedRef.current) {
                submittedRef.current = true;
                submitGames2048Score(nextScore, hasWon)
                    .then((response) => {
                        setIsNewBest(response?.isNewBest ?? null);
                        if (response?.isNewBest) setBestScore(nextScore);
                    })
                    .catch(() => {
                        // Best-effort: the score stays in local storage either
                        // way, nothing to recover here.
                    });
            }
        },
        [persist],
    );

    const game = gameRef.current;
    return {
        board: game.board,
        score: game.score,
        bestScore,
        status: game.status,
        hasWon: game.hasWon,
        isNewBest,
        play,
        startNewGame,
    };
}
