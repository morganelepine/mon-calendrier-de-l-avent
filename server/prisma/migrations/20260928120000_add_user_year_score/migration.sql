-- UserYearScore: running total of Score.points per user and per year, so
-- leaderboards stop summing every Score row of the year on each request.
CREATE TABLE "public"."UserYearScore" (
    "userId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "lastEarnedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserYearScore_pkey" PRIMARY KEY ("userId","year")
);

CREATE INDEX "UserYearScore_year_total_lastEarnedAt_idx" ON "public"."UserYearScore"("year", "total" DESC, "lastEarnedAt");

ALTER TABLE "public"."UserYearScore" ADD CONSTRAINT "UserYearScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Backfill from existing Score rows (every year, so last season's total
-- is available too).
INSERT INTO "public"."UserYearScore" ("userId", "year", "total", "lastEarnedAt")
SELECT "userId", "year", SUM("points"), MAX("earnedAt")
FROM "public"."Score"
GROUP BY "userId", "year";
