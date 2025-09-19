/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `GamePost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortId` to the `GamePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."GamePost" ADD COLUMN     "shortId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GamePost_shortId_key" ON "public"."GamePost"("shortId");
