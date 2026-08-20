import { Request, Response, NextFunction } from "express";
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from "../lib/adminSession";

function parseCookies(header: string | undefined): Record<string, string> {
    const out: Record<string, string> = {};
    (header ?? "").split(";").forEach((pair) => {
        const idx = pair.indexOf("=");
        if (idx === -1) return;
        out[pair.slice(0, idx).trim()] = decodeURIComponent(pair.slice(idx + 1).trim());
    });
    return out;
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
    const cookies = parseCookies(req.headers.cookie);
    if (!isValidSessionCookie(cookies[ADMIN_COOKIE_NAME])) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    next();
}
