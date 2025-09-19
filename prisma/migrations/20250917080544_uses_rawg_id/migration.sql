/*
  Warnings:

  - Changed the type of `gameId` on the `ListGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."ListGame" DROP CONSTRAINT "ListGame_gameId_fkey";

-- AlterTable
ALTER TABLE "public"."ListGame" DROP COLUMN "gameId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ListGame_listId_gameId_key" ON "public"."ListGame"("listId", "gameId");

-- AddForeignKey
ALTER TABLE "public"."ListGame" ADD CONSTRAINT "ListGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("rawgId") ON DELETE RESTRICT ON UPDATE CASCADE;
