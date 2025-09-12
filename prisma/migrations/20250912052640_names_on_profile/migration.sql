/*
  Warnings:

  - A unique constraint covering the columns `[listId,gameId]` on the table `ListGame` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,gameId]` on the table `UserGameStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "platform" TEXT;

-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ListGame_listId_gameId_key" ON "public"."ListGame"("listId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGameStatus_userId_gameId_key" ON "public"."UserGameStatus"("userId", "gameId");
