import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDB() {
    await prisma.user.createMany({
        data: [
            { uuid: "123", score: 0 },
            { uuid: "456", score: 25 },
            { uuid: "789", score: 40 },
        ],
    });
    console.log("3 users have been added to the database.");
}

seedDB()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// npx prisma db seed
