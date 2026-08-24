// Thin wrapper around the Expo Push API (https://exp.host/--/api/v2/push/send).
// No SDK dependency: Node 20's built-in `fetch` is enough for this.

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

// Expo rejects requests with more than 100 messages at once.
const CHUNK_SIZE = 100;

export type ExpoPushMessage = {
    to: string;
    title: string;
    body: string;
    data?: Record<string, unknown>;
};

type ExpoPushTicket = {
    status: "ok" | "error";
    message?: string;
    details?: { error?: string };
};

export type PushSendResult = {
    token: string;
    ok: boolean;
    // Set when Expo reports the token itself is no longer valid
    // (uninstall, permission revoked...) so the caller can clear it.
    shouldForgetToken: boolean;
};

function chunk<T>(items: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size));
    }
    return chunks;
}

export async function sendExpoPushNotifications(
    messages: ExpoPushMessage[],
): Promise<PushSendResult[]> {
    const results: PushSendResult[] = [];

    for (const batch of chunk(messages, CHUNK_SIZE)) {
        const res = await fetch(EXPO_PUSH_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(batch),
        });

        let tickets: ExpoPushTicket[] = [];
        try {
            const json = (await res.json()) as { data?: ExpoPushTicket[] };
            tickets = json.data ?? [];
        } catch {
            // Malformed/empty response body - every ticket in this batch
            // below resolves to "not ok" and is simply retried tomorrow.
        }

        batch.forEach((message, index) => {
            const ticket = tickets[index];
            const ok = ticket?.status === "ok";
            results.push({
                token: message.to,
                ok,
                shouldForgetToken:
                    !ok && ticket?.details?.error === "DeviceNotRegistered",
            });
        });
    }

    return results;
}
