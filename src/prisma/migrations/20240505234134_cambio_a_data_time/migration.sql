/*
  Warnings:

  - Added the required column `FechaNacimiento` to the `Agente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agente" DROP COLUMN "FechaNacimiento",
ADD COLUMN     "FechaNacimiento" TIMESTAMP(3) NOT NULL;
