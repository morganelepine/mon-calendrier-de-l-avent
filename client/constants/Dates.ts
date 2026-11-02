import { getStoredFakeDate } from "@/services/tests/fakeDate.service";
import { formatIsoDate } from "@/services/tests/fakeDate.utils";

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

// Fake "today" to test the app as if it were a specific date,
// set from the "Test" screen (informations/test).
const DEBUG_FAKE_TODAY: Date | null = getStoredFakeDate();

const today = DEBUG_FAKE_TODAY ?? new Date();

// Real-to-fake time offset: a live, ticking display (see useCountdown) needs
// a "now" that keeps advancing second by second, not the single frozen
// snapshot above. Without this it would silently fall back to the real
// Date.now() and ignore DEBUG_FAKE_TODAY entirely.
export const isFakeToday = DEBUG_FAKE_TODAY !== null;
const REAL_LOAD_TIME = Date.now();
export const getNow = (): number =>
    isFakeToday ? today.getTime() + (Date.now() - REAL_LOAD_TIME) : Date.now();

export const christmasDay = new Date(today.getFullYear(), 11, 25);
const calendarDay = new Date(today.getFullYear(), 11, 1);

export const currentDay = today.getDate();
export const currentMonth = today.getMonth(); // 0 = janvier, 11 = décembre

export const todayIsoDate = formatIsoDate(today);
export const tomorrowIsoDate = formatIsoDate(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
);

export const isDecember = currentMonth === 11;
export const isOctober = currentMonth === 9;
export const isChristmasSeason = currentMonth >= 10;

export const isChristmas =
    isDecember && today.getDate() === christmasDay.getDate();

export const isAfterChristmas =
    isDecember && !isChristmas && today.getDate() > christmasDay.getDate();

// Exported so the countdown can be recomputed against a user-chosen target
// (e.g. the 24th instead of the 25th) while staying on the same "today"
// (including DEBUG_FAKE_TODAY) as the rest of this file.
export const getDaysUntil = (target: Date): number =>
    Math.ceil((target.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY);

export const daysToChristmas = getDaysUntil(christmasDay);

export const daysToCalendar = getDaysUntil(calendarDay);

const halloweenDay = new Date(today.getFullYear(), 9, 31);

export const isHalloween = isOctober && currentDay === halloweenDay.getDate();

export const daysToHalloween = getDaysUntil(halloweenDay);
