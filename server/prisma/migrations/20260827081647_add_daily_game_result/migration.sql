-- CreateTable
CREATE TABLE "DailyGameResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "game" TEXT NOT NULL,
    "playDate" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "won" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyGameResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyGameResult_game_playDate_idx" ON "DailyGameResult"("game", "playDate");

-- CreateIndex
CREATE UNIQUE INDEX "DailyGameResult_userId_game_playDate_key" ON "DailyGameResult"("userId", "game", "playDate");

-- AddForeignKey
ALTER TABLE "DailyGameResult" ADD CONSTRAINT "DailyGameResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
