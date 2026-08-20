import { Request, Response, NextFunction } from "express";
import { verifyPassword } from "../../lib/adminPassword";
import {
    ADMIN_COOKIE_NAME,
    cookieOptions,
    createSessionCookieValue,
    isValidSessionCookie,
} from "../../lib/adminSession";

function parseCookies(header: string | undefined): Record<string, string> {
    const out: Record<string, string> = {};
    (header ?? "").split(";").forEach((pair) => {
        const idx = pair.indexOf("=");
        if (idx === -1) return;
        out[pair.slice(0, idx).trim()] = decodeURIComponent(pair.slice(idx + 1).trim());
    });
    return out;
}

export class AdminAuthController {
    // POST /admin-auth/login
    async login(request: Request, response: Response, next: NextFunction) {
        const { password } = request.body ?? {};
        const storedHash = process.env.ADMIN_PASSWORD_HASH;

        if (!storedHash || typeof password !== "string" || !verifyPassword(password, storedHash)) {
            return { status: 401, success: false };
        }

        response.cookie(ADMIN_COOKIE_NAME, createSessionCookieValue(), cookieOptions());
        return { status: 200, success: true };
    }

    // POST /admin-auth/logout
    async logout(request: Request, response: Response, next: NextFunction) {
        response.clearCookie(ADMIN_COOKIE_NAME, cookieOptions());
        return { status: 200, success: true };
    }

    // GET /admin-auth/me — always 200: the SPA calls this on load to decide
    // login-vs-dashboard, so it must never itself 401.
    async me(request: Request, response: Response, next: NextFunction) {
        const cookies = parseCookies(request.headers.cookie);
        return {
            status: 200,
            authenticated: isValidSessionCookie(cookies[ADMIN_COOKIE_NAME]),
        };
    }
}
