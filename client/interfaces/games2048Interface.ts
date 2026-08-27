export interface SubmitScoreResponse {
    isNewBest: boolean;
    result: { score: number; won: boolean; attempts: number };
}

export interface Games2048LeaderboardEntry {
    userId: number;
    username: string;
    score: number;
    won: boolean;
}

export type Games2048LeaderboardAroundResponse =
    | { userHasScore: false }
    | {
          userHasScore: true;
          userRank: number;
          total: number;
          hasMoreAbove: boolean;
          hasMoreBelow: boolean;
          data: (Games2048LeaderboardEntry & { rank: number })[];
      };

export interface Games2048Stats {
    gamesPlayed: number;
    winRatePercent: number;
    currentStreak: number;
    bestStreak: number;
    bestScore: number;
    bestScoreDate: string | null; // "YYYY-MM-DD"
}

// Persisted locally so a game in progress survives the app being closed.
export interface Games2048InProgressState {
    playDate: string; // "YYYY-MM-DD" - discarded on load if it isn't today
    board: number[][];
    score: number;
    hasWon: boolean; // reached the top tile at least once - play can continue after
    // Number of rng() calls consumed so far today - replayed on resume so the
    // rng stream picks back up exactly where it left off (see useGame2048).
    rngCallCount: number;
    status: "playing" | "gameover";
}
