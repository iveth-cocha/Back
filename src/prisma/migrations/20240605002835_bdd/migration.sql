/*
  Warnings:

  - A unique constraint covering the columns `[tokenSession]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "tokenSession" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_tokenSession_key" ON "Usuario"("tokenSession");
