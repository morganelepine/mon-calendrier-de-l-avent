// Keep in sync with server/src/controllers/score.controller.ts
export const CHECK_IN_LAST_DAY = 24;
const CHECK_IN_BONUS_INTERVAL = 4;
const CHECK_IN_BONUS_STEP = 10;

// Growing bonus: +10 on the 4th consecutive day, +20 on the 8th, +30 on the 12th...
const getCheckInBonus = (streak: number): number =>
    (streak / CHECK_IN_BONUS_INTERVAL) * CHECK_IN_BONUS_STEP;

// A streak stays alive until the end of today even if today isn't checked in yet.
export const getCheckInStreak = (
    checkedDays: Set<number>,
    today: number,
): number => {
    const lastDay = checkedDays.has(today) ? today : today - 1;
    let streak = 0;
    while (checkedDays.has(lastDay - streak)) streak++;
    return streak;
};

// Bonuses still reachable before the end of the calendar if the streak
// continues, by day: the first one is today if checking in earns it.
export const getUpcomingCheckInBonuses = (
    streak: number,
    checkedInToday: boolean,
    today: number,
): Map<number, number> => {
    const bonuses = new Map<number, number>();
    const lastCheckedDay = checkedInToday ? today : today - 1;
    let bonusStreak =
        streak + CHECK_IN_BONUS_INTERVAL - (streak % CHECK_IN_BONUS_INTERVAL);
    let day = lastCheckedDay + bonusStreak - streak;
    while (day <= CHECK_IN_LAST_DAY) {
        bonuses.set(day, getCheckInBonus(bonusStreak));
        bonusStreak += CHECK_IN_BONUS_INTERVAL;
        day += CHECK_IN_BONUS_INTERVAL;
    }
    return bonuses;
};
