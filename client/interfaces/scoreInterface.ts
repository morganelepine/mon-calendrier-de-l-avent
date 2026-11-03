export interface Score {
    dayNumber: number;
    dayIsOpen: boolean;
    checkedIn: boolean;
    usedJoker: boolean;
    scoreDetails: ScoreDetail;
}

export interface ScoreDetail {
    dayOpening: number;
    contentOpening: number;
    gameAnswer: number;
    checkIn: number; // streak bonus, 0 on most days
}

export interface GameState {
    [dayNumber: number]: {
        [reason: string]: {
            [itemNumber: number]: boolean; // true = already scored
        };
    };
}
