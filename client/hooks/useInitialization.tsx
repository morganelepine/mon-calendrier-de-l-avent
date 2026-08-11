import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { getOrCreateUser } from "@/services/user.service";
import { logClient } from "@/services/log.service";
import { useUser } from "@/contexts/UserContext";

const MAX_RETRY = 3;
const USER_RETRY_DELAY = 1500;

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
    const stored = await AsyncStorage.getItem("userUuid");
    if (stored) return ensureStringUUID(stored);

    const newUuid = ensureStringUUID(uuid.v4());
    await AsyncStorage.setItem("userUuid", newUuid);
    return newUuid;
}

async function cacheUser(uuid: string, username: string, userId: number) {
    await AsyncStorage.multiSet([
        ["userUuid", uuid],
        ["username", username],
        ["userId", String(userId)],
    ]);
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

    // Best-effort, non-blocking: confirms the cached identity is still valid
    // and picks up anything that changed server-side
    // (e.g. the account got recycled by the ghost-cleanup job).
    // Never touches `status` — the app is already usable from cache
    // by the time this runs; a failure here just means we try again next launch.
    async function refreshInBackground(userUuid: string) {
        try {
            const user = await getOrCreateUser(userUuid);
            await cacheUser(userUuid, user.username, user.id);
            setUsername(user.username);
            setUserId(user.id);
        } catch (e) {
            await logClient("Background user refresh failed", {
                userUuid,
                error: String(e),
            });
        }
    }

    async function init() {
        setStatus("loading");

        const [cachedUuid, cachedUsername, cachedUserId] = await Promise.all([
            AsyncStorage.getItem("userUuid"),
            AsyncStorage.getItem("username"),
            AsyncStorage.getItem("userId"),
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

    return { status, retry: init };
}
