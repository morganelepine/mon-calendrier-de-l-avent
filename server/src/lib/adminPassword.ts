import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export function hashPassword(plain: string): string {
    const saltBytes = randomBytes(16);
    // scrypt : fonction de dérivation de clé lente,
    // conçue pour résister au brute-force par calcul massif,
    // contrairement à un simple SHA-256
    const hash = scryptSync(plain, saltBytes, 64).toString("hex");
    return `${saltBytes.toString("hex")}:${hash}`;
}

export function verifyPassword(plain: string, stored: string): boolean {
    const [saltHex, hashHex] = stored.split(":");
    if (!saltHex || !hashHex) return false;

    const candidate = scryptSync(plain, Buffer.from(saltHex, "hex"), 64);
    const expected = Buffer.from(hashHex, "hex");

    // Comparer avec timingSafeEqual plutôt qu'un ===
    // pour éviter qu'un attaquant mesure le temps de réponse
    // pour deviner le hash octet par octet (attaque par timing)
    return (
        candidate.length === expected.length &&
        timingSafeEqual(candidate, expected)
    );
}
