import React, { createContext, useContext, useMemo } from "react";
import { StorageKeys } from "@/constants/storageKeys";
import { ChristmasTargetDay, CountdownVariant } from "@/enums/enums";
import { usePersistedPreference } from "@/hooks/usePersistedPreference";

const isCountdownVariant = (value: string | null): value is CountdownVariant =>
    !!value && (Object.values(CountdownVariant) as string[]).includes(value);

const parseChristmasTargetDay = (raw: string): ChristmasTargetDay | null => {
    const parsed = Number(raw);
    return parsed === ChristmasTargetDay.Eve ||
        parsed === ChristmasTargetDay.Day
        ? parsed
        : null;
};

interface CountdownVariantContextType {
    variant: CountdownVariant;
    setVariant: (variant: CountdownVariant) => void;
    // Only relevant to Columns - Nights never shows sub-day units.
    showSeconds: boolean;
    setShowSeconds: (showSeconds: boolean) => void;
    // What the countdown counts down to (24th or 25th) - see enums.ts.
    targetDay: ChristmasTargetDay;
    setTargetDay: (targetDay: ChristmasTargetDay) => void;
}

const CountdownVariantContext = createContext<
    CountdownVariantContextType | undefined
>(undefined);

// Single source of truth for the chosen countdown display, shared by Home
// and the settings screen so changing a preference in Settings updates Home
// immediately instead of waiting for it to remount and re-read AsyncStorage.
export const CountdownVariantProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [variant, setVariant] = usePersistedPreference<CountdownVariant>(
        StorageKeys.countdownVariant,
        CountdownVariant.Nights,
        (raw) => (isCountdownVariant(raw) ? raw : null),
        (value) => value,
    );

    const [showSeconds, setShowSeconds] = usePersistedPreference<boolean>(
        StorageKeys.countdownShowSeconds,
        true,
        (raw) => (raw === "yes" ? true : raw === "no" ? false : null),
        (value) => (value ? "yes" : "no"),
    );

    const [targetDay, setTargetDay] =
        usePersistedPreference<ChristmasTargetDay>(
            StorageKeys.countdownTargetDay,
            ChristmasTargetDay.Day,
            parseChristmasTargetDay,
            (value) => String(value),
        );

    const value = useMemo(
        () => ({
            variant,
            setVariant,
            showSeconds,
            setShowSeconds,
            targetDay,
            setTargetDay,
        }),
        [
            variant,
            setVariant,
            showSeconds,
            setShowSeconds,
            targetDay,
            setTargetDay,
        ],
    );

    return (
        <CountdownVariantContext.Provider value={value}>
            {children}
        </CountdownVariantContext.Provider>
    );
};

const useCountdownVariantContext = (): CountdownVariantContextType => {
    const context = useContext(CountdownVariantContext);
    if (!context) {
        throw new Error(
            "This hook must be used inside CountdownVariantProvider",
        );
    }
    return context;
};

// Each returned as a tuple, like useState, to keep call sites unchanged.
export const useCountdownVariant = () => {
    const { variant, setVariant } = useCountdownVariantContext();
    return [variant, setVariant] as const;
};

export const useCountdownShowSeconds = () => {
    const { showSeconds, setShowSeconds } = useCountdownVariantContext();
    return [showSeconds, setShowSeconds] as const;
};

export const useChristmasTargetDay = () => {
    const { targetDay, setTargetDay } = useCountdownVariantContext();
    return [targetDay, setTargetDay] as const;
};
