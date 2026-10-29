-- CreateTable
CREATE TABLE "public"."UserRetrospective" (
    "userId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "daysOpened" INTEGER NOT NULL,
    "openedDays" INTEGER[],
    "longestStreak" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "timeProfile" TEXT NOT NULL,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRetrospective_pkey" PRIMARY KEY ("userId","year")
);

-- CreateTable
CREATE TABLE "public"."RetrospectiveStats" (
    "year" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RetrospectiveStats_pkey" PRIMARY KEY ("year")
);

-- AddForeignKey
ALTER TABLE "public"."UserRetrospective" ADD CONSTRAINT "UserRetrospective_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
