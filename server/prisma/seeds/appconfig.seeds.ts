import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.appConfig.upsert({
        where: { key: "min_required_version" },
        update: { value: "1.1.0" },
        create: { key: "min_required_version", value: "1.1.0" },
    });
    console.log("Version minimale initialisée !");
}

try {
    await main();
} catch (e) {
    console.error(e);
} finally {
    await prisma.$disconnect();
}
