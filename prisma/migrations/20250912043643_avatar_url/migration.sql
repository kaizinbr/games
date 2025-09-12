/*
  Warnings:

  - You are about to drop the column `img` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "img",
ADD COLUMN     "avatarUrl" TEXT;
