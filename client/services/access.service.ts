import { apiFetch, ApiError } from "@/services/apiFetch";

// Gate for the web/PWA build only — see components/navigation/AccessGate.tsx.
export async function verifyWebAccessCode(code: string): Promise<boolean> {
    try {
        await apiFetch<{ success: boolean }>("/access/verify", {
            method: "POST",
            body: { code },
        });
        return true;
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) return false;
        throw error;
    }
}
