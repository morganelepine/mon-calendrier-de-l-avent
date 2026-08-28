const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

// DEBUG: force a fake "today" to test the app as if it were a specific date
// const DEBUG_FAKE_TODAY: Date | null = new Date(
//     new Date().getFullYear(),
//     11,
//     11,
// );
const DEBUG_FAKE_TODAY: Date | null = null;

const today = DEBUG_FAKE_TODAY ?? new Date();
const christmasDay = new Date(today.getFullYear(), 11, 25);
const calendarDay = new Date(today.getFullYear(), 11, 1);

export const currentDay = today.getDate();
const currentMonth = today.getMonth(); // 0 = janvier, 11 = décembre

export const isDecember = currentMonth === 7;
export const isOctober = currentMonth === 9;

export const isChristmas =
    isDecember && today.getDate() === christmasDay.getDate();

export const isAfterChristmas =
    isDecember && !isChristmas && today.getDate() > christmasDay.getDate();

export const daysToChristmas = Math.ceil(
    (christmasDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY,
);

export const daysToCalendar = Math.ceil(
    (calendarDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY,
);
