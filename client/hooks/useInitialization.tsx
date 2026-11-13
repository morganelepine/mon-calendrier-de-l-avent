import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { getOrCreateUser } from "@/services/user.service";
import { setUnknownUserHandler } from "@/services/apiFetch";
import { flushPendingScores } from "@/services/score.service";
import { logClient } from "@/services/sentry.service";
import { useUser } from "@/contexts/UserContext";
import { StorageKeys, YEARLY_RESET_KEYS } from "@/constants/storageKeys";

const MAX_RETRY = 3;
const USER_RETRY_DELAY = 1500;
const USER_REFRESH_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

// Several requests can 404 at once (pending scores flush + scores screen):
// only one get-or-create should run.
let isRefreshing = false;

function ensureStringUUID(value: string | number[]): string {
    if (!value) return "";
    if (typeof value === "string") return value;
    return String(value);
}

async function wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

// Retries `fn` up to `times` times, waiting `delayMs` between attempts.
// Each failure is reported via `onError` but doesn't stop the loop.
// Returns null if every attempt failed.
async function withRetry<T>(
    fn: () => Promise<T>,
    times: number,
    delayMs: number,
    onError: (error: unknown, attempt: number) => void,
): Promise<T | null> {
    for (let attempt = 1; attempt <= times; attempt++) {
        try {
            return await fn();
        } catch (e) {
            onError(e, attempt);
        }
        if (attempt < times) await wait(delayMs);
    }
    return null;
}

// Reads the locally stored uuid, or generates and persists a new one.
async function getOrCreateUUID(): Promise<string> {
    const stored = await AsyncStorage.getItem(StorageKeys.userUuid);
    if (stored) return ensureStringUUID(stored);

    const newUuid = ensureStringUUID(uuid.v4());
    await AsyncStorage.setItem(StorageKeys.userUuid, newUuid);
    return newUuid;
}

async function cacheUser(uuid: string, username: string, userId: number) {
    await AsyncStorage.multiSet([
        [StorageKeys.userUuid, uuid],
        [StorageKeys.username, username],
        [StorageKeys.userId, String(userId)],
        [StorageKeys.lastUserRefresh, String(Date.now())],
    ]);
}

// Wipes last year's calendar/game progress once per year,
// before anything else reads it.
async function resetDataIfNeeded() {
    try {
        const currentYear = new Date().getFullYear().toString();
        const lastResetYear = await AsyncStorage.getItem(
            StorageKeys.lastResetYear,
        );
        if (lastResetYear === currentYear) return;

        await AsyncStorage.multiRemove([...YEARLY_RESET_KEYS]);
        await AsyncStorage.setItem(StorageKeys.lastResetYear, currentYear);
    } catch (error) {
        await logClient("Yearly data reset failed", { error: String(error) });
    }
}

// Initializes the user context by ensuring a uuid exists,
// then fetching or creating the user account.
export function useInitialization() {
    const { setUsername, setUserUuid, setUserId } = useUser();
    const [status, setStatus] = useState<"loading" | "error" | "ready">(
        "loading",
    );

    // Blocking bootstrap: only reached when nothing usable
    // is cached locally yet (first ever launch, or the cache got cleared).
    // Creates the account if needed and doesn't resolve until we have one.
    async function bootstrap() {
        try {
            const userUuid = await getOrCreateUUID();

            // Single call that creates the account on first launch,
            // or simply returns the existing one on every later launch.
            // This also covers a previous attempt whose response got lost:
            // the retry below just fetches the same account back instead of erroring.
            const user = await withRetry(
                () => getOrCreateUser(userUuid),
                MAX_RETRY,
                USER_RETRY_DELAY,
                (error, attempt) =>
                    logClient("Get-or-create user failed", {
                        userUuid,
                        error: String(error),
                        attempt,
                    }),
            );

            if (!user) {
                await logClient("User bootstrap permanently failed", {
                    userUuid,
                });
                setStatus("error");
                return;
            }

            await cacheUser(userUuid, user.username, user.id);
            setUserUuid(userUuid);
            setUsername(user.username);
            setUserId(user.id);
            setStatus("ready");
        } catch (e) {
            await logClient("Fatal error", { error: String(e) });
            setStatus("error");
        }
    }

    // Best-effort, non-blocking safety net: if the User row ever goes missing
    // server-side (DB reset, deletion), get-or-create recreates it and the new id
    // gets cached. Weekly rather than every launch, since each call wakes the database,
    // but forced as soon as the server answers "unknown user" (see apiFetch).
    // Never touches `status` — the app is already usable from cache
    // by the time this runs; a failure here just means we try again next launch.
    async function refreshInBackground(userUuid: string, force = false) {
        if (isRefreshing) return;
        isRefreshing = true;
        try {
            if (!force) {
                const lastRefresh = Number(
                    await AsyncStorage.getItem(StorageKeys.lastUserRefresh),
                );
                if (Date.now() - lastRefresh < USER_REFRESH_INTERVAL_MS) return;
            }

            const user = await getOrCreateUser(userUuid);
            await cacheUser(userUuid, user.username, user.id);
            setUsername(user.username);
            setUserId(user.id);

            // Scores queued while the account was missing can now be credited.
            if (force) flushPendingScores().catch(() => {});
        } catch (e) {
            await logClient("Background user refresh failed", {
                userUuid,
                error: String(e),
            });
        } finally {
            isRefreshing = false;
        }
    }

    async function init() {
        setStatus("loading");

        await resetDataIfNeeded();

        const [cachedUuid, cachedUsername, cachedUserId] = await Promise.all([
            AsyncStorage.getItem(StorageKeys.userUuid),
            AsyncStorage.getItem(StorageKeys.username),
            AsyncStorage.getItem(StorageKeys.userId),
        ]);

        // Fast path: we already know who this user is, so show the app right away
        // instead of blocking on a network call on every single launch,
        // then quietly confirm/refresh in the background.
        if (cachedUuid && cachedUsername && cachedUserId) {
            setUserUuid(cachedUuid);
            setUsername(cachedUsername);
            setUserId(Number(cachedUserId));
            setStatus("ready");
            refreshInBackground(cachedUuid);
            return;
        }

        await bootstrap();
    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        setUnknownUserHandler(() => {
            AsyncStorage.getItem(StorageKeys.userUuid)
                .then((userUuid) => {
                    if (userUuid) void refreshInBackground(userUuid, true);
                })
                .catch(() => {});
        });
        return (): void => setUnknownUserHandler(null);
        // Registered once: refreshInBackground only uses the context's stable setters.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { status, retry: init };
}
