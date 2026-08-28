import { Request, Response, NextFunction } from "express";
import { verifyPassword } from "../lib/adminPassword";

export class AccessController {
    // POST /access/verify — gates the web/PWA build only
    // (see client/components/navigation/AccessGate.tsx).
    // Not a real auth system, just a shared code to keep randoms off the PWA and out of the DB.
    async verify(request: Request, response: Response, next: NextFunction) {
        const { code } = request.body ?? {};
        const storedHash = process.env.PWA_ACCESS_CODE_HASH;

        if (
            !storedHash ||
            typeof code !== "string" ||
            !verifyPassword(code, storedHash)
        ) {
            return { status: 401, success: false };
        }

        return { status: 200, success: true };
    }
}
