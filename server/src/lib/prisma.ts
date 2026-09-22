import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Content/ContentListItem are the one part of this schema with zero FK relations to User/Score/Group/GameHighScore.
// They can safely live in a single shared database across dev and prod (same admin-authored content everywhere)
// while everything else stays split per environment via the default DATABASE_URL above.
export const contentPrisma = new PrismaClient({
    datasourceUrl: process.env.CONTENT_DATABASE_URL,
});
