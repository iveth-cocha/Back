/*
  Warnings:

  - You are about to drop the column `agenteID` on the `Delegacion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Delegacion" DROP CONSTRAINT "Delegacion_agenteID_fkey";

-- AlterTable
ALTER TABLE "Delegacion" DROP COLUMN "agenteID";
