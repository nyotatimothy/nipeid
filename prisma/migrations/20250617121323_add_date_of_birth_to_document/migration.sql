/*
  Warnings:

  - The values [VISITOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dateOfBirth` on the `ContactRequest` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ContactRequest` table. All the data in the column will be lost.
  - You are about to drop the column `notified` on the `ContactRequest` table. All the data in the column will be lost.
  - You are about to drop the column `searchQuery` on the `ContactRequest` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Dispute` table. All the data in the column will be lost.
  - You are about to drop the column `explanation` on the `Dispute` table. All the data in the column will be lost.
  - The `status` column on the `Dispute` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `condition` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `dateFound` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `expiredAt` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `foundDistrict` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `foundDivision` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `foundLocation` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `foundSubLocation` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `changedById` on the `DocumentStatusHistory` table. All the data in the column will be lost.
  - You are about to drop the column `accessInfo` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `contactPerson` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `county` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `fridayHours` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `landmarks` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `mondayHours` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `parkingInfo` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `saturdayHours` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `sundayHours` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `thursdayHours` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `tuesdayHours` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `wednesdayHours` on the `Kiosk` table. All the data in the column will be lost.
  - You are about to drop the column `channel` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `sent` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `SupportTicket` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[documentNumber]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reason` to the `Dispute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DocumentStatusHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('MPESA', 'CARD', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('STK_PUSH', 'C2B', 'B2C', 'B2B');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'TIMEOUT', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'KIOSK_MANAGER', 'ADMIN', 'POSTER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'DELETED';

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_kioskId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_posterId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentStatusHistory" DROP CONSTRAINT "DocumentStatusHistory_changedById_fkey";

-- DropIndex
DROP INDEX "Kiosk_email_key";

-- DropIndex
DROP INDEX "Kiosk_name_key";

-- DropIndex
DROP INDEX "User_provider_providerId_idx";

-- AlterTable
ALTER TABLE "ContactRequest" DROP COLUMN "dateOfBirth",
DROP COLUMN "name",
DROP COLUMN "notified",
DROP COLUMN "searchQuery",
ADD COLUMN     "message" TEXT,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Dispute" DROP COLUMN "category",
DROP COLUMN "explanation",
ADD COLUMN     "reason" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "condition",
DROP COLUMN "dateFound",
DROP COLUMN "expiredAt",
DROP COLUMN "foundDistrict",
DROP COLUMN "foundDivision",
DROP COLUMN "foundLocation",
DROP COLUMN "foundSubLocation",
DROP COLUMN "middleName",
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "kioskId" DROP NOT NULL,
ALTER COLUMN "posterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DocumentStatusHistory" DROP COLUMN "changedById",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Kiosk" DROP COLUMN "accessInfo",
DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "contactPerson",
DROP COLUMN "county",
DROP COLUMN "description",
DROP COLUMN "email",
DROP COLUMN "fridayHours",
DROP COLUMN "hours",
DROP COLUMN "isActive",
DROP COLUMN "landmarks",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "mondayHours",
DROP COLUMN "parkingInfo",
DROP COLUMN "password",
DROP COLUMN "postalCode",
DROP COLUMN "saturdayHours",
DROP COLUMN "status",
DROP COLUMN "sundayHours",
DROP COLUMN "thursdayHours",
DROP COLUMN "tuesdayHours",
DROP COLUMN "wednesdayHours";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "channel",
DROP COLUMN "sent",
DROP COLUMN "type",
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "SupportTicket";

-- DropEnum
DROP TYPE "Condition";

-- DropEnum
DROP TYPE "DisputeCategory";

-- DropEnum
DROP TYPE "DisputeStatus";

-- DropEnum
DROP TYPE "KioskStatus";

-- DropEnum
DROP TYPE "NotificationChannel";

-- DropEnum
DROP TYPE "NotificationType";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'KES',
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'MPESA',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "mpesaRequestId" TEXT,
    "mpesaCheckoutId" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "mpesaRequestId" TEXT,
    "mpesaCheckoutId" TEXT,
    "transactionType" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DOUBLE PRECISION NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_mpesaRequestId_key" ON "Payment"("mpesaRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_mpesaCheckoutId_key" ON "Payment"("mpesaCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_mpesaRequestId_key" ON "Transaction"("mpesaRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_mpesaCheckoutId_key" ON "Transaction"("mpesaCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_documentNumber_key" ON "Document"("documentNumber");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_kioskId_fkey" FOREIGN KEY ("kioskId") REFERENCES "Kiosk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentStatusHistory" ADD CONSTRAINT "DocumentStatusHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactRequest" ADD CONSTRAINT "ContactRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
