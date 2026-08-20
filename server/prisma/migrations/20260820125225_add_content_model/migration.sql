-- CreateEnum
CREATE TYPE "ContentFamily" AS ENUM ('story', 'idea', 'anecdote', 'game');

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "type" "ContentFamily" NOT NULL,
    "subType" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "content1" TEXT NOT NULL DEFAULT '',
    "content2" TEXT NOT NULL DEFAULT '',
    "content3" TEXT NOT NULL DEFAULT '',
    "content4" TEXT NOT NULL DEFAULT '',
    "media" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "new" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentListItem" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ContentListItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Content_dayNumber_idx" ON "Content"("dayNumber");

-- CreateIndex
CREATE INDEX "Content_type_subType_idx" ON "Content"("type", "subType");

-- CreateIndex
CREATE INDEX "ContentListItem_contentId_idx" ON "ContentListItem"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentListItem_contentId_order_key" ON "ContentListItem"("contentId", "order");

-- AddForeignKey
ALTER TABLE "ContentListItem" ADD CONSTRAINT "ContentListItem_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
