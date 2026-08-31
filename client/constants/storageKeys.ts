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
    notificationsNoticeSeen: "notifications_notice_seen",
    // Web/PWA only — see components/navigation/AccessGate.tsx.
    webAccessGranted: "web_access_granted",

    // Last contents successfully fetched from the backoffice API, used as an
    // offline/outage fallback so a down API doesn't blank out day content.
    contentsCache: "contents_cache",

    // This year's calendar/game progress.
    // Reset every year, see YEARLY_RESET_KEYS below.
    calendar: "calendar",
    octoberCalendar: "october_calendar",
    gameState: "gameState",
    // Scores recorded locally but not yet confirmed by the server.
    pendingScores: "pending_scores",
    bingoHalloweenClickedCells: "bingo_halloween_clicked_cells",
    bingoMoviesClickedCells: "bingo_movies_clicked_cells",
    bingoTelefilmsClickedCells: "bingo_telefilms_clicked_cells",
    bingoActivitiesClickedCells: "bingo_activities_clicked_cells",
    game2048InProgress: "game2048_in_progress",

    // Reset bookkeeping.
    lastResetYear: "lastResetYear",
} as const;

// Everything that represents "this year's" progress
// and must be wiped when a new advent calendar season starts.
export const YEARLY_RESET_KEYS = [
    StorageKeys.calendar,
    StorageKeys.octoberCalendar,
    StorageKeys.gameState,
    StorageKeys.pendingScores,
    StorageKeys.bingoHalloweenClickedCells,
    StorageKeys.bingoMoviesClickedCells,
    StorageKeys.bingoTelefilmsClickedCells,
    StorageKeys.bingoActivitiesClickedCells,
    StorageKeys.game2048InProgress,
] as const;
