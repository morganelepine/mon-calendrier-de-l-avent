-- No query filters Score by (userId, year, reason) without also filtering
-- by day, so this index was never actually reachable in practice -
-- [userId, year, day] already covers every real access pattern.
DROP INDEX "public"."Score_userId_year_reason_idx";
