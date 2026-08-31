export interface SubmitScoreResponse {
    isNewBest: boolean;
    result: { score: number; achievedAt: string };
}

export interface Games2048LeaderboardEntry {
    userId: number;
    username: string;
    score: number;
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
    bestScore: number;
    achievedAt: string | null;
}

export interface Games2048InProgressState {
    board: number[][];
    score: number;
    hasWon: boolean; // reached the top tile at least once - play can continue after
    status: "playing" | "gameover";
    scoreSubmitted: boolean;
}
