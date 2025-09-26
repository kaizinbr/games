/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `expires` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Otp_expiresAt_idx";

-- AlterTable
ALTER TABLE "public"."Otp" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Otp_expires_idx" ON "public"."Otp"("expires");
