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
    answers: string;
    correctAnswer: string;
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
    typeTitle: string;
    title: string;
    years: number[];
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
    typeTitle: string;
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    media: string;
    years: number[];
    listItems: ContentListItemInput[];
}

// As returned by server/src/controllers/admin/stats.controller.ts.
export interface DateCount {
    date: string; // YYYY-MM-DD, French time
    count: number;
}

export interface Stats {
    year: number;
    season: Season;
    openingsByDay: { day: number; users: number }[];
    openingsByType: { type: ContentFamily; users: number }[] | null; // null for October: content openings aren't recorded.
    dayOpeners: {
        active: number; // opened at least one box that season
        availableDays: number; // boxes openable so far (all once it's over)
        byDaysOpened: { days: number; users: number }[]; // most days first
    };
    newUsersByDate: DateCount[];
    userCohorts: {
        returningActive: number;
        returningInactive: number;
        newActive: number;
        newInactive: number;
    };
    notifications: { withToken: number; total: number };
    premium: { premium: number; total: number; byDate: DateCount[] };
    usernames: {
        possible: number; // curated + with segment (numeric suffixes excluded)
        curated: number; // server/src/data/usernames.ts
        curatedAvailable: number; // curated, not yet given to a user
    };
    groups: {
        count: number;
        avgSize: number;
        usersInGroup: number;
        totalUsers: number;
    };
}
