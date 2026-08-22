const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

const today = new Date();
const christmasDay = new Date(today.getFullYear(), 11, 25);
const calendarDay = new Date(today.getFullYear(), 11, 1);

export const currentDay = today.getDate();
const currentMonth = today.getMonth(); // 0 = janvier, 11 = décembre

export const isDecember = currentMonth === 11;
export const isHalloween = currentMonth === 9; // octobre

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
