// A source of randomness to draw from when spawning tiles - injected rather
// than called directly so the engine stays a pure, easily testable function
// of its inputs. In practice this is just Math.random (see useGame2048).
export type Rng = () => number;

export const GRID_SIZE = 4;
// Top tile a player can reach (2^11 = 2048).
export const MAX_TIER = 11;

export type Direction = "up" | "down" | "left" | "right";
// 0 = empty cell, otherwise a tier from 1 to MAX_TIER.
export type Board = number[][];

export interface MoveResult {
    board: Board;
    scoreGained: number;
    moved: boolean; // false when the move changed nothing (blocked edge)
}

export function createEmptyBoard(): Board {
    return Array.from({ length: GRID_SIZE }, () =>
        new Array(GRID_SIZE).fill(0),
    );
}

function emptyCells(board: Board): [number, number][] {
    const cells: [number, number][] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === 0) cells.push([row, col]);
        }
    }
    return cells;
}

// Spawns one tile (tier 1, 90% of the time; tier 2 otherwise) on a random
// empty cell, consuming the rng - a no-op copy of the board if it's full.
export function spawnTile(board: Board, rng: Rng): Board {
    const next = board.map((row) => [...row]);
    const cells = emptyCells(next);
    if (cells.length === 0) return next;

    const [row, col] = cells[Math.floor(rng() * cells.length)];
    next[row][col] = rng() < 0.9 ? 1 : 2;
    return next;
}

export function createInitialBoard(rng: Rng): Board {
    return spawnTile(spawnTile(createEmptyBoard(), rng), rng);
}

function transpose(board: Board): Board {
    return board[0].map((_, col) => board.map((row) => row[col]));
}

// Slides a row's tiles towards index 0 and merges equal neighbours,
// classic 2048 rules: a tile merges at most once per move,
// and a tile born from a merge doesn't merge again in the same move.
function collapseRow(row: number[]): { row: number[]; scoreGained: number } {
    const tiles = row.filter((tier) => tier !== 0);
    const result: number[] = [];
    let scoreGained = 0;

    for (let i = 0; i < tiles.length; i++) {
        if (
            tiles[i] !== 0 &&
            tiles[i] === tiles[i + 1] &&
            tiles[i] < MAX_TIER
        ) {
            const mergedTier = tiles[i] + 1;
            result.push(mergedTier);
            scoreGained += 2 ** mergedTier;
            i++; // the next tile was just merged in, skip it
        } else {
            result.push(tiles[i]);
        }
    }

    while (result.length < GRID_SIZE) result.push(0);
    return { row: result, scoreGained };
}

// Every direction reduces to "collapse each row towards index 0": up/down
// transpose the board first (columns become rows), and right/down reverse
// each row first (so "towards the end" becomes "towards index 0").
export function move(board: Board, direction: Direction): MoveResult {
    const transposed = direction === "up" || direction === "down";
    const reversed = direction === "right" || direction === "down";

    let working = transposed ? transpose(board) : board.map((row) => [...row]);
    if (reversed) working = working.map((row) => [...row].reverse());

    let scoreGained = 0;
    let collapsed = working.map((row) => {
        const result = collapseRow(row);
        scoreGained += result.scoreGained;
        return result.row;
    });

    if (reversed) collapsed = collapsed.map((row) => [...row].reverse());
    const finalBoard = transposed ? transpose(collapsed) : collapsed;

    const moved = finalBoard.some((row, r) =>
        row.some((tier, c) => tier !== board[r][c]),
    );
    return { board: finalBoard, scoreGained, moved };
}

export function hasMovesLeft(board: Board): boolean {
    if (emptyCells(board).length > 0) return true;

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const tier = board[row][col];
            if (tier >= MAX_TIER) continue; // can no longer merge further
            if (col < GRID_SIZE - 1 && board[row][col + 1] === tier)
                return true;
            if (row < GRID_SIZE - 1 && board[row + 1][col] === tier)
                return true;
        }
    }
    return false;
}

export function hasReachedMaxTier(board: Board): boolean {
    return board.some((row) => row.some((tier) => tier >= MAX_TIER));
}
