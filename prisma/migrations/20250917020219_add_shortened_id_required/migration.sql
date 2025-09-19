/*
  Warnings:

  - Made the column `shortId` on table `List` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."List" ALTER COLUMN "shortId" SET NOT NULL;
