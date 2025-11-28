import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { getUser, saveUser } from "@/services/user.service";
import { logClient } from "@/services/log.service";
import { useUser } from "@/contexts/UserContext";

const MAX_RETRY = 3;
const RETRY_DELAY = 1500;

function ensureStringUUID(value: any): string {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value[0];
    return String(value);
}

async function wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

// Get and save UUID with retry
async function generateUUIDWithRetry() {
    for (let i = 0; i < MAX_RETRY; i++) {
        try {
            let newUuid = ensureStringUUID(uuid.v4());
            await AsyncStorage.setItem("userUuid", newUuid);
            return newUuid;
        } catch (e) {
            await logClient("UUID save failed", {
                error: String(e),
                attempt: i + 1,
            });
            await wait(500);
        }
    }
    return null;
}

export function useInitialization() {
    const { setUsername } = useUser();
    const [status, setStatus] = useState<"loading" | "error" | "ready">(
        "ready"
    );

    async function init() {
        try {
            let isUsername = await AsyncStorage.getItem("username");
            if (isUsername) {
                setUsername(isUsername);
                setStatus("ready");
                return;
            }

            // Get or create UUID
            let userUuid = await AsyncStorage.getItem("userUuid");

            if (!userUuid) {
                userUuid = await generateUUIDWithRetry();
                if (!userUuid) {
                    setStatus("error");
                    return;
                }
            }

            userUuid = ensureStringUUID(userUuid);

            // Check if user exists in DB
            let user = null;
            try {
                // throw new Error("mock fail");
                user = await getUser(userUuid);
            } catch (e) {
                await logClient("Check if user exists in DB failed (getUser)", {
                    userUuid,
                    error: String(e),
                });
                setStatus("error");
                return;
            }

            if (user?.username) {
                await AsyncStorage.setItem("username", user.username);
                setUsername(user.username);
                setStatus("ready");
                return;
            }

            // Create user with retry
            let createdUsername = null;

            for (let attempt = 0; attempt < MAX_RETRY; attempt++) {
                try {
                    // throw new Error("mock fail");
                    createdUsername = await saveUser(userUuid, 0);
                } catch (e) {
                    await logClient("Save user in DB failed (saveUser)", {
                        userUuid,
                        error: String(e),
                        attempt: attempt + 1,
                    });
                }

                if (createdUsername) break;

                await wait(RETRY_DELAY);
            }

            if (!createdUsername) {
                await logClient("User creation permanently failed", {
                    userUuid,
                });
                setStatus("error");
                return;
            }

            await AsyncStorage.setItem("username", createdUsername);
            setUsername(createdUsername);
            setStatus("ready");
        } catch (e) {
            await logClient("Fatal error", { error: String(e) });
            setStatus("error");
        }
    }

    // useEffect(() => {
    //     (async () => {
    //         const [userUuid, storedUsername] = await Promise.all([
    //             AsyncStorage.getItem("userUuid"),
    //             AsyncStorage.getItem("username"),
    //         ]);

    //         if (userUuid && storedUsername) {
    //             setUsername(storedUsername);
    //             setStatus("ready");
    //         } else {
    //             await init();
    //         }
    //     })();
    // }, []);

    useEffect(() => {
        init();
    }, []);

    return { status, retry: init };
}
