/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."List" ADD COLUMN     "shortId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "List_shortId_key" ON "public"."List"("shortId");
