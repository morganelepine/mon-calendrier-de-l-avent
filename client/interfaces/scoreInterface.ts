export interface Score {
    dayNumber: number;
    dayIsOpen: boolean;
    scoreDetails: ScoreDetail;
}

export interface ScoreDetail {
    dayOpening: number;
    contentOpening: number;
    gameAnswer: number;
}

export interface GameState {
    [dayNumber: number]: {
        [reason: string]: {
            [itemNumber: number]: boolean; // true = already scored
        };
    };
}
