/*
  Warnings:

  - You are about to drop the column `passwordUpdated` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "passwordUpdated",
ADD COLUMN     "actualizarPassword" BOOLEAN NOT NULL DEFAULT false;
