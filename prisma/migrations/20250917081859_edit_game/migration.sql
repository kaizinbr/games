/*
  Warnings:

  - The `platform` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `publisher` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "platform",
ADD COLUMN     "platform" TEXT[],
DROP COLUMN "publisher",
ADD COLUMN     "publisher" TEXT[],
ALTER COLUMN "releaseDate" SET DATA TYPE TEXT;
