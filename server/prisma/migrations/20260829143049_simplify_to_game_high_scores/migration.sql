-- CreateTable
CREATE TABLE "GameHighScore" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "game" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "achievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameHighScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GameHighScore_game_idx" ON "GameHighScore"("game");

-- CreateIndex
CREATE UNIQUE INDEX "GameHighScore_userId_game_key" ON "GameHighScore"("userId", "game");

-- AddForeignKey
ALTER TABLE "GameHighScore" ADD CONSTRAINT "GameHighScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DataMigration: carry over each user's best score ever from DailyGameResult
-- before dropping it, one row per (userId, game) - ties broken by the
-- earliest date that score was achieved on.
INSERT INTO "GameHighScore" ("userId", "game", "score", "achievedAt")
SELECT DISTINCT ON ("userId", "game")
    "userId",
    "game",
    "score",
    "playDate"::timestamp
FROM "DailyGameResult"
ORDER BY "userId", "game", "score" DESC, "playDate" ASC;

-- DropForeignKey
ALTER TABLE "DailyGameResult" DROP CONSTRAINT "DailyGameResult_userId_fkey";

-- DropTable
DROP TABLE "DailyGameResult";
