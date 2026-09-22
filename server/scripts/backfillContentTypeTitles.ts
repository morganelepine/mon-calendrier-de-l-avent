import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// One-off migration: fills the new Content.typeTitle column with whatever
// text the old hardcoded client-side switches (ContentScreenWrapper.tsx /
// GameScreenWrapper.tsx, pre-typeTitle) would have shown for that row, so
// introducing the column is a no-op for existing rows. New rows (and edits
// to existing ones) set typeTitle directly from the admin from now on.
//
// Usage:
//   npm run backfill:content-type-titles              (dry run)
//   npm run backfill:content-type-titles -- --confirm  (write)

const prisma = new PrismaClient();

function computeTypeTitle(
    type: string,
    subType: string,
    season: string,
): string {
    const isHalloween = season === "halloween";

    if (type === "game") {
        if (isHalloween) return "Un jeu";
        return subType.startsWith("quiz") ? "Quiz du jour" : "Jeu du jour";
    }

    switch (subType) {
        case "story":
        case "article":
            return "L'histoire du jour";
        case "anecdote":
            return isHalloween ? "Une anecdote" : "L'anecdote du jour";
        case "word":
            return "Le mot du jour";
        case "song":
            return "La chanson du jour";
        case "drink":
            return "La boisson du jour";
        case "recipe":
            return isHalloween ? "Une recette" : "La recette du jour";
        case "idea":
            return "L'idée du jour";
        case "list":
            return isHalloween ? "Des recos" : "Une petite sélection";
        default:
            return "Contenu du jour";
    }
}

async function main() {
    const shouldWrite = process.argv.includes("--confirm");

    const rows = await prisma.content.findMany({
        where: { typeTitle: "" },
        select: { id: true, type: true, subType: true, season: true, title: true },
        orderBy: { id: "asc" },
    });

    console.log(
        `${rows.length} content row(s) with an empty typeTitle.${
            shouldWrite ? "" : " (dry run - pass --confirm to write)"
        }`,
    );

    for (const row of rows) {
        const typeTitle = computeTypeTitle(row.type, row.subType, row.season);
        console.log(
            `#${row.id} [${row.season}/${row.type}/${row.subType}] "${row.title}" -> "${typeTitle}"`,
        );

        if (shouldWrite) {
            await prisma.content.update({
                where: { id: row.id },
                data: { typeTitle },
            });
        }
    }

    if (!shouldWrite) {
        console.log("\nDry run only - rerun with --confirm to apply.");
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
