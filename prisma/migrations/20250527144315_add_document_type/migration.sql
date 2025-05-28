/*
  Warnings:

  - Added the required column `documentType` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable - Add column with default value first
ALTER TABLE "Document" ADD COLUMN "documentType" "DocumentType" NOT NULL DEFAULT 'NATIONAL_ID';

-- Update existing records to have appropriate document types based on document number patterns
UPDATE "Document" SET "documentType" = 'PASSPORT' WHERE "documentNumber" ~ '^[A-Z]{1,2}[0-9]{6,8}$';
UPDATE "Document" SET "documentType" = 'DRIVING_LICENSE' WHERE "documentNumber" ~ '^[0-9]{8}$';

-- Remove default value to make it required without default for future inserts
ALTER TABLE "Document" ALTER COLUMN "documentType" DROP DEFAULT;
