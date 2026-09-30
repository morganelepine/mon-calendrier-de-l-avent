-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "years" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- Backfill: "new" -> 2026 only; published -> 2025 + 2026; draft -> no year
UPDATE "Content" SET "years" = ARRAY[2026] WHERE "published" AND "new";
UPDATE "Content" SET "years" = ARRAY[2025, 2026] WHERE "published" AND NOT "new";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "new",
DROP COLUMN "published";
