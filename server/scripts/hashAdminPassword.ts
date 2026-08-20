import { hashPassword } from "../src/lib/adminPassword";

// Usage: npm run admin:hash-password -- "my-chosen-password"
// Prints the value to put in ADMIN_PASSWORD_HASH.

const password = process.argv[2];
if (!password) {
    console.error('Usage: npm run admin:hash-password -- "my-chosen-password"');
    process.exitCode = 1;
} else {
    console.log(hashPassword(password));
}
