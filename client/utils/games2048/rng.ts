// Deterministic RNG so that everyone who plays the same calendar day
// sees the exact same sequence of tile spawns for the same sequence of moves.
// The game is re-seeded from scratch on every fresh attempt (never continued across attempts),
// so replaying doesn't let you "re-roll" for a luckier board:
// playing the same moves again always reproduces the same result.

// cyrb53: small, fast, well-distributed string hash.
// Turns the day's date string into a 32-bit seed for the PRNG below.
function hashStringToSeed(text: string): number {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < text.length; i++) {
        const ch = text.codePointAt(i)!;
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
        Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
        Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    return h1 >>> 0;
}

export type Rng = () => number; // returns a float in [0, 1)

// mulberry32: tiny seeded PRNG, deterministic for a given seed.
function mulberry32(seed: number): Rng {
    let state = seed;
    return () => {
        state = Math.trunc(state);
        state = Math.trunc(state + 0x6d2b79f5);
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function createDailyRng(playDate: string, game: string): Rng {
    return mulberry32(hashStringToSeed(`${game}-${playDate}`));
}
