/*
  Warnings:

  - The `gameId` column on the `GamePost` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "public"."GamePost" DROP CONSTRAINT "GamePost_gameId_fkey";

-- AlterTable
ALTER TABLE "public"."GamePost" ADD COLUMN     "played" INTEGER,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "gameId",
ADD COLUMN     "gameId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."GamePost" ADD CONSTRAINT "GamePost_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("rawgId") ON DELETE SET NULL ON UPDATE CASCADE;
