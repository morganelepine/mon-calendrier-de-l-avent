// Single source of truth for every AsyncStorage key the app reads/writes.

export const StorageKeys = {
    // Identity / device-level preferences - NOT reset on a new calendar year,
    // they belong to the device/account, not to a given season.
    userUuid: "userUuid",
    username: "username",
    userId: "userId",
    // Timestamp (ms) of the last successful background get-or-create.
    lastUserRefresh: "last_user_refresh",
    hasLaunched: "hasLaunched",
    playMusic: "playMusic",
    excludedMusics: "excluded_musics",
    countdownVariant: "countdown_variant",
    countdownShowSeconds: "countdown_show_seconds",
    countdownTargetDay: "countdown_target_day",
    countdownTarget: "countdown_target",
    // Last known premium status, for the home screen widgets.
    widgetsPremium: "widgets_premium",
    groupCreated: "groupCreated",
    halloweenNoticeSeen: "halloween_notice_seen",
    notificationsNoticeSeen: "notifications_notice_seen",
    game2048WinSeen: "game2048_win_seen",
    // Web/PWA only — see components/navigation/AccessGate.tsx.
    webAccessGranted: "web_access_granted",

    // Last contents successfully fetched from the backoffice API, used as an
    // offline/outage fallback so a down API doesn't blank out day content.
    contentsCache: "contents_cache",
    // { year, score }: last season's total, shown off season (see score.service).
    previousYearScore: "previous_year_score",
    // Today's TV movies schedule.
    tvMoviesCache: "tv_movies_cache",

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
    // Highest score objective already celebrated on the scores screen.
    objectiveCelebrated: "objective_celebrated",
    dismissedUpdateVersion: "dismissed_update_version",

    // Reset bookkeeping.
    lastResetYear: "lastResetYear",
} as const;

// One key per home announcement (Announcement table, served by /version).
export const announcementSeenKey = (id: string): string =>
    `announcement_seen_${id}`;

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
    StorageKeys.objectiveCelebrated,
    StorageKeys.dismissedUpdateVersion,
] as const;
