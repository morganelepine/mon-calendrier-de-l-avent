// Mirrors server/prisma/schema.prisma's Content/ContentListItem shapes,
// as returned by server/src/controllers/admin/contents.controller.ts.

export type ContentFamily = "story" | "idea" | "anecdote" | "game";
export type Season = "christmas" | "halloween";

export interface ContentListItemInput {
    title: string;
    description: string;
    author: string;
    image: string;
    url: string;
}

export interface ContentListItem extends ContentListItemInput {
    id: number;
    contentId: number;
    order: number;
}

export interface ContentSummary {
    id: number;
    dayNumber: number;
    season: Season;
    type: ContentFamily;
    subType: string;
    title: string;
    published: boolean;
    isNew: boolean;
}

export interface ContentDetail extends ContentSummary {
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    media: string;
    listItems: ContentListItem[];
}

export interface ContentInput {
    dayNumber: number;
    season: Season;
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
    listItems: ContentListItemInput[];
}
