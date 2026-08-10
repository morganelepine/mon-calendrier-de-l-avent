import { API_URL } from "@/constants/api";
import { Sentry } from "@/services/sentry.service";

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
    options: ApiFetchOptions = {},
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
    } catch (error) {
        let apiError: ApiError;

        if (error instanceof ApiError) {
            apiError = error;
        } else if (error instanceof Error && error.name === "AbortError") {
            apiError = new ApiError(0, "", "Timeout réseau");
        } else {
            apiError = new ApiError(0, "", `Network error: ${String(error)}`);
        }

        // “Expected” 4xx errors (404, 409...) are treated as warnings;
        // the rest (5xx, network, timeout) are treated as actual errors.
        Sentry.captureException(apiError, {
            level:
                apiError.status >= 400 && apiError.status < 500
                    ? "warning"
                    : "error",
            extra: { path, status: apiError.status, body: apiError.bodyText },
        });

        throw apiError;
    } finally {
        clearTimeout(timer);
    }
}
