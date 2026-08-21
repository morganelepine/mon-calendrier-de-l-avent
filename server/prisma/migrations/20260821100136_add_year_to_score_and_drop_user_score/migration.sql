-- Score: add "year", backfilled from earnedAt for the handful of existing
-- rows (all from the current season), then made required. Old indexes are
-- dropped in favor of year-aware ones, since every query from here on
-- filters by year.
ALTER TABLE "public"."Score" ADD COLUMN "year" INTEGER;

UPDATE "public"."Score" SET "year" = EXTRACT(YEAR FROM "earnedAt");

ALTER TABLE "public"."Score" ALTER COLUMN "year" SET NOT NULL;

DROP INDEX "public"."Score_userId_day_idx";
DROP INDEX "public"."Score_userId_reason_idx";

CREATE INDEX "Score_userId_year_day_idx" ON "public"."Score"("userId", "year", "day");
CREATE INDEX "Score_userId_year_reason_idx" ON "public"."Score"("userId", "year", "reason");
CREATE INDEX "Score_year_idx" ON "public"."Score"("year");

-- User: drop the cumulative counter - a user's score is now always derived
-- by summing Score.points for a given year, so there is nothing left to
-- keep in sync (and nothing left to reset by hand each December).
ALTER TABLE "public"."User" DROP COLUMN "score";
