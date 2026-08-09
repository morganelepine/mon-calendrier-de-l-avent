import { API_URL } from "@/constants/api";

export class ApiError extends Error {
    status: number;
    bodyText: string;

    constructor(status: number, bodyText: string, message?: string) {
        super(message ?? `API error ${status}`);
        this.status = status;
        this.bodyText = bodyText;
    }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
    body?: unknown;
    timeoutMs?: number;
};

export async function apiFetch<T>(
    path: string,
    options: ApiFetchOptions = {}
): Promise<T> {
    const { timeoutMs = 10000, body, headers, ...rest } = options;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(`${API_URL}${path}`, {
            ...rest,
            headers: { "Content-Type": "application/json", ...headers },
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });

        if (!res.ok) {
            throw new ApiError(res.status, await res.text().catch(() => ""));
        }

        if (res.status === 204) return undefined as T;

        return (await res.json()) as T;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        if (err instanceof Error && err.name === "AbortError") {
            throw new ApiError(0, "", "Timeout réseau");
        }
        throw new ApiError(0, "", `Network error: ${String(err)}`);
    } finally {
        clearTimeout(timer);
    }
}
