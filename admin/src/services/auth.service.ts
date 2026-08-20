import { apiFetch } from "./apiFetch";

export const login = (password: string) =>
    apiFetch<{ success: boolean }>("/admin-auth/login", {
        method: "POST",
        body: { password },
    });

export const logout = () =>
    apiFetch<{ success: boolean }>("/admin-auth/logout", { method: "POST" });

export const me = () => apiFetch<{ authenticated: boolean }>("/admin-auth/me");
