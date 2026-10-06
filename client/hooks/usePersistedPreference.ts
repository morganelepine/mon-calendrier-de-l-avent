import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logClient } from "@/services/log.service";

// Reads/writes a single AsyncStorage-backed preference.
export const usePersistedPreference = <T>(
    key: string,
    defaultValue: T,
    parse: (raw: string) => T | null,
    serialize: (value: T) => string,
): [T, (next: T) => void] => {
    const [value, setValueState] = useState<T>(defaultValue);

    useEffect(() => {
        AsyncStorage.getItem(key).then((stored) => {
            if (stored === null) return;
            const parsed = parse(stored);
            if (parsed !== null) setValueState(parsed);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    // Stable across renders (only changes if the key itself does) so
    // consumers - e.g. a context's useMemo - can safely depend
    // on it without recomputing every render.
    const setValue = useCallback(
        (next: T): void => {
            setValueState(next);
            AsyncStorage.setItem(key, serialize(next)).catch((error) => {
                console.error(`Error setting "${key}" preference`, error);
                logClient(`Error setting "${key}" preference`, {
                    error: String(error),
                });
            });
        },
        // parse/serialize are expected to be pure functions of `key` alone
        // (see call sites) - only `key` should ever change identity.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [key],
    );

    return [value, setValue];
};
