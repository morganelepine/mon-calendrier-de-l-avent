export type TimeProfile = "morning" | "afternoon" | "evening" | "night";

// Percentages of players (0-100) with the same value / strictly lower.
export interface RetrospectiveComparison {
    value: number;
    samePercent: number;
    lowerPercent: number;
}

export interface Retrospective {
    available: true;
    year: number;
    playerCount: number;
    openedDays: number[];
    daysOpened: RetrospectiveComparison;
    longestStreak: RetrospectiveComparison;
    correctAnswers: RetrospectiveComparison;
    timeProfile: { value: TimeProfile; samePercent: number };
    points: { value: number; topPercent: number };
}

export type RetrospectiveResponse = Retrospective | { available: false };
