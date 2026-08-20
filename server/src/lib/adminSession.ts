import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12h

function sign(payload: string): string {
    return createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
        .update(payload)
        .digest("base64url");
}

export function createSessionCookieValue(): string {
    const payload = String(Date.now() + SESSION_TTL_MS);
    return `${payload}.${sign(payload)}`;
}

export function isValidSessionCookie(value: string | undefined): boolean {
    if (!value) return false;

    const [payload, signature] = value.split(".");
    if (!payload || !signature) return false;

    const a = Buffer.from(signature);
    const b = Buffer.from(sign(payload));
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

    return Number(payload) > Date.now();
}

export function cookieOptions() {
    const isProd = process.env.NODE_ENV === "production";
    // SameSite=None+Secure is required cross-site
    // (the admin app and this API live on different Vercel domains)
    // but browsers reject SameSite=None over plain http://localhost.
    // Fall back to Lax/insecure outside production so the login flow still works locally.
    return isProd
        ? { httpOnly: true, secure: true, sameSite: "none" as const, path: "/" }
        : {
              httpOnly: true,
              secure: false,
              sameSite: "lax" as const,
              path: "/",
          };
}
