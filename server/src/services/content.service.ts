import { prisma } from "../lib/prisma";

export interface ListOfContentsItem {
    id: number;
    title: string;
    description: string;
    author?: string;
    image?: string;
    url?: string;
}

export interface Content {
    id: number;
    dayNumber: number;
    season: string;
    type: string;
    subType?: string;
    title: string;
    content1: string;
    content2?: string;
    content3?: string;
    content4?: string;
    media?: string;
    listOfContents?: ListOfContentsItem[];
}

export async function getContents(): Promise<Content[]> {
    const rows = await prisma.content.findMany({
        where: { published: true },
        include: { listItems: { orderBy: { order: "asc" } } },
        orderBy: { id: "asc" },
    });

    return rows.map((row) => ({
        id: row.id,
        dayNumber: row.dayNumber,
        season: row.season,
        type: row.type,
        subType: row.subType,
        title: row.title,
        content1: row.content1,
        content2: row.content2,
        content3: row.content3,
        content4: row.content4,
        media: row.media,
        listOfContents: row.listItems.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            author: item.author,
            image: item.image,
            url: item.url,
        })),
    }));
}
