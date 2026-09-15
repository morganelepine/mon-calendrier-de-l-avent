import { useEffect, useState } from "react";
import { getNow } from "@/constants/Dates";

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

export interface CountdownValues {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const getRemaining = (targetDate: Date): CountdownValues => {
    const totalMs = Math.max(0, targetDate.getTime() - getNow());

    return {
        days: Math.floor(totalMs / MS_IN_DAY),
        hours: Math.floor((totalMs % MS_IN_DAY) / MS_IN_HOUR),
        minutes: Math.floor((totalMs % MS_IN_HOUR) / MS_IN_MINUTE),
        seconds: Math.floor((totalMs % MS_IN_MINUTE) / MS_IN_SECOND),
    };
};

// Live days/hours/minutes/seconds remaining until targetDate, ticking every second.
// Pass enabled: false to skip the interval entirely (e.g. a variant
// that only needs a day count, computed elsewhere, doesn't need this to tick).
export const useCountdown = (
    targetDate: Date,
    enabled: boolean = true,
): CountdownValues => {
    const [remaining, setRemaining] = useState(() => getRemaining(targetDate));

    useEffect((): (() => void) | undefined => {
        if (!enabled) return undefined;

        const interval = setInterval(() => {
            setRemaining(getRemaining(targetDate));
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, targetDate.getTime()]);

    return remaining;
};
