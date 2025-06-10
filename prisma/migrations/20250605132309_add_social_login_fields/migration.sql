/*
  Warnings:

  - The values [INACTIVE] on the enum `KioskStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "KioskStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');
ALTER TABLE "Kiosk" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Kiosk" ALTER COLUMN "status" TYPE "KioskStatus_new" USING ("status"::text::"KioskStatus_new");
ALTER TYPE "KioskStatus" RENAME TO "KioskStatus_old";
ALTER TYPE "KioskStatus_new" RENAME TO "KioskStatus";
DROP TYPE "KioskStatus_old";
ALTER TABLE "Kiosk" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT,
ADD COLUMN     "providerId" TEXT;

-- CreateIndex
CREATE INDEX "User_provider_providerId_idx" ON "User"("provider", "providerId");
