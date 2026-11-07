import { useEffect, useState } from "react";
import { getNow } from "@/constants/Dates";

export const getCurrentMinutes = (): number => {
    const now = new Date(getNow());
    return now.getHours() * 60 + now.getMinutes();
};

// Minutes since midnight, refreshed every minute (fake date included).
// Device time is assumed to be French time, like the TV schedule.
export const useCurrentMinutes = (): number => {
    const [minutes, setMinutes] = useState(getCurrentMinutes);

    useEffect(() => {
        const interval = setInterval(
            () => setMinutes(getCurrentMinutes()),
            60 * 1000,
        );
        return (): void => clearInterval(interval);
    }, []);

    return minutes;
};
