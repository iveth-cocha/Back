/*
  Warnings:

  - You are about to drop the column `tokenSession` on the `Usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Usuario_token_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "tokenSession";
