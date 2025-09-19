/*
  Warnings:

  - The `genre` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "releaseDate" TIMESTAMP(3),
DROP COLUMN "genre",
ADD COLUMN     "genre" TEXT[];
