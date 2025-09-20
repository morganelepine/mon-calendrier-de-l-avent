-- CreateIndex
CREATE INDEX "Score_userId_day_idx" ON "public"."Score"("userId", "day");

-- CreateIndex
CREATE INDEX "Score_userId_reason_idx" ON "public"."Score"("userId", "reason");
