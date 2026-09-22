-- AlterTable
ALTER TABLE "ContentListItem" ADD COLUMN     "answers" TEXT NOT NULL DEFAULT '';
ALTER TABLE "ContentListItem" ADD COLUMN     "correctAnswer" TEXT NOT NULL DEFAULT '';
