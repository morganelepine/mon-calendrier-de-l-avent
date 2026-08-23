// Single source of truth for every AsyncStorage key the app reads/writes.

export const StorageKeys = {
    // Identity / device-level preferences - NOT reset on a new calendar year,
    // they belong to the device/account, not to a given season.
    userUuid: "userUuid",
    username: "username",
    userId: "userId",
    hasLaunched: "hasLaunched",
    playMusic: "playMusic",
    groupCreated: "groupCreated",
    halloweenNoticeSeen: "halloween_notice_seen",

    // This year's calendar/game progress.
    // Reset every year, see YEARLY_RESET_KEYS below.
    calendar: "calendar",
    octoberCalendar: "october_calendar",
    gameState: "gameState",
    bingoHalloweenClickedCells: "bingo_halloween_clicked_cells",
    bingoFilmsClickedCells: "bingo_films_clicked_cells",
    bingoActivitiesClickedCells: "bingo_activities_clicked_cells",

    // Reset bookkeeping.
    lastResetYear: "lastResetYear",
} as const;

// Everything that represents "this year's" progress
// and must be wiped when a new advent calendar season starts.
export const YEARLY_RESET_KEYS = [
    StorageKeys.calendar,
    StorageKeys.octoberCalendar,
    StorageKeys.gameState,
    StorageKeys.bingoHalloweenClickedCells,
    StorageKeys.bingoFilmsClickedCells,
    StorageKeys.bingoActivitiesClickedCells,
] as const;
