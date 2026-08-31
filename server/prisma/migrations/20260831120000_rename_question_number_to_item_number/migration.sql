-- Rename only, no data change: this column already identifies whichever
-- item is being scored within a (day, reason) - "questionNumber" only ever
-- fit the GameAnswer case, not ContentOpening.
ALTER TABLE "public"."Score" RENAME COLUMN "questionNumber" TO "itemNumber";
