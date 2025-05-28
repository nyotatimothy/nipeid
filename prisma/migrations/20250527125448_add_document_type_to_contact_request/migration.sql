-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('NATIONAL_ID', 'PASSPORT', 'BIRTH_CERTIFICATE', 'DRIVING_LICENSE', 'OTHER');

-- AlterTable
ALTER TABLE "ContactRequest" ADD COLUMN     "documentType" "DocumentType";
