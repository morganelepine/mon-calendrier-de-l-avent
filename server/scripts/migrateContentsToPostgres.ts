import "dotenv/config";
import { Client, collectAllDataSourceRows } from "@notionhq/client";
import { ContentFamily, PrismaClient } from "@prisma/client";

// One-off migration: pushes the "Contenus" Notion database into the new
// Content/ContentListItem Postgres tables. Notion remains the source of
// truth until this runs — this script reads it, not the bundled
// client/data/contents/*.js snapshots.
//
// Usage:
//   npm run migrate:contents-to-postgres                          (dry run)
//   npm run migrate:contents-to-postgres -- --confirm              (write)
//   npm run migrate:contents-to-postgres -- --confirm --wipe-existing
//     (required in addition to --confirm if the Content table already has
//     rows — see the safety note below)

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const CONTENTS_DATA_SOURCE_ID = process.env.NOTION_CONTENTS_DATA_SOURCE_ID;

const prisma = new PrismaClient();

interface ListItemInput {
    id?: number;
    title?: string;
    description?: string;
    author?: string;
    image?: string;
    url?: string;
}

interface ContentRow {
    dayNumber: number;
    type: ContentFamily;
    subType: string;
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    media: string;
    published: boolean;
    isNew: boolean;
    listItems: ListItemInput[];
}

const plainText = (richText: { plain_text: string }[] | undefined): string =>
    (richText ?? []).map((t) => t.plain_text).join("");

function mapPageToContentRow(page: any): ContentRow {
    const p = page.properties;

    let listItems: ListItemInput[] = [];
    const listOfContentsRaw = plainText(p.listOfContents?.rich_text);
    if (listOfContentsRaw) {
        try {
            listItems = JSON.parse(listOfContentsRaw);
        } catch (err) {
            console.error(`Failed to parse listOfContents on page ${page.id}:`, err);
        }
    }

    return {
        dayNumber: p.dayNumber?.number ?? 0,
        type: (p.type?.select?.name ?? "idea") as ContentFamily,
        subType: plainText(p.subType?.rich_text),
        title: plainText(p.title?.title),
        content1: plainText(p.content1?.rich_text),
        content2: plainText(p.content2?.rich_text),
        content3: plainText(p.content3?.rich_text),
        content4: plainText(p.content4?.rich_text),
        media: plainText(p.media?.rich_text),
        published: p.published?.checkbox ?? true,
        isNew: p.New?.checkbox ?? false,
        listItems,
    };
}

async function fetchContentRowsFromNotion(): Promise<ContentRow[]> {
    if (!NOTION_TOKEN) {
        throw new Error("Missing NOTION_TOKEN env var — see server/README.md.");
    }
    if (!CONTENTS_DATA_SOURCE_ID) {
        throw new Error("Missing NOTION_CONTENTS_DATA_SOURCE_ID env var — see server/README.md.");
    }

    const notion = new Client({ auth: NOTION_TOKEN, notionVersion: "2025-09-03" });
    const rows = await collectAllDataSourceRows(notion, {
        data_source_id: CONTENTS_DATA_SOURCE_ID,
    });

    return rows.map(mapPageToContentRow);
}

async function main() {
    const rows = await fetchContentRowsFromNotion();
    const byType = rows.reduce<Record<string, number>>((acc, row) => {
        acc[row.type] = (acc[row.type] ?? 0) + 1;
        return acc;
    }, {});
    const listItemCount = rows.reduce((sum, row) => sum + row.listItems.length, 0);

    console.log(`Read ${rows.length} content row(s) from Notion.`);
    console.log("By type:", byType);
    console.log(
        `${rows.filter((r) => r.listItems.length > 0).length} row(s) with a listOfContents ` +
            `(${listItemCount} item(s) total).`
    );

    const shouldWrite = process.argv.includes("--confirm");
    if (!shouldWrite) {
        console.log("\nDry run only — nothing written to Postgres. First entry:");
        console.log(rows[0]);
        console.log("\nRe-run with --confirm to write:");
        console.log("  npm run migrate:contents-to-postgres -- --confirm");
        return;
    }

    // This is a destructive, wipe-then-insert migration (no reliable natural
    // key across 120+ rows to upsert on). Safe to run once against empty
    // tables; refuse a second run so it can't silently erase real edits
    // made through the backoffice after go-live.
    const existingCount = await prisma.content.count();
    const wipeExisting = process.argv.includes("--wipe-existing");
    if (existingCount > 0 && !wipeExisting) {
        console.error(
            `\nContent table already has ${existingCount} row(s). This script wipes the table ` +
                "before inserting, which would destroy them. If that's really what you want " +
                "(e.g. re-running the very first load), pass --wipe-existing too:\n" +
                "  npm run migrate:contents-to-postgres -- --confirm --wipe-existing"
        );
        process.exitCode = 1;
        return;
    }
    if (existingCount > 0) {
        console.log(`Wiping ${existingCount} existing Content row(s) (--wipe-existing passed)...`);
    }
    await prisma.content.deleteMany({});

    let created = 0;
    for (const row of rows) {
        await prisma.content.create({
            data: {
                dayNumber: row.dayNumber,
                type: row.type,
                subType: row.subType,
                title: row.title,
                content1: row.content1,
                content2: row.content2,
                content3: row.content3,
                content4: row.content4,
                media: row.media,
                published: row.published,
                isNew: row.isNew,
                listItems: {
                    create: row.listItems.map((item, order) => ({
                        order,
                        title: item.title ?? "",
                        description: item.description ?? "",
                        author: item.author ?? "",
                        image: item.image ?? "",
                        url: item.url ?? "",
                    })),
                },
            },
        });
        created++;
        if (created % 10 === 0 || created === rows.length) {
            console.log(`  ${created}/${rows.length}`);
        }
    }

    console.log(`\nTerminé : ${created} contenu(s) créé(s) dans Postgres.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
