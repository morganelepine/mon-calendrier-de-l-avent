import { hashPassword } from "../src/lib/adminPassword";

// Usage: npm run pwa:hash-code -- "my-chosen-code"
// Prints the value to put in PWA_ACCESS_CODE_HASH.

const code = process.argv[2];
if (!code) {
    console.error('Usage: npm run pwa:hash-code -- "my-chosen-code"');
    process.exitCode = 1;
} else {
    console.log(hashPassword(code));
}
