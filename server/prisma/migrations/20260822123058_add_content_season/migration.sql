-- CreateEnum
CREATE TYPE "Season" AS ENUM ('christmas', 'halloween');

-- DropIndex
DROP INDEX "Content_dayNumber_idx";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "season" "Season" NOT NULL DEFAULT 'christmas';

-- CreateIndex
CREATE INDEX "Content_dayNumber_season_idx" ON "Content"("dayNumber", "season");
