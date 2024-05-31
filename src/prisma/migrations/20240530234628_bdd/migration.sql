/*
  Warnings:

  - You are about to drop the column `tokenPassword` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "tokenPassword",
ADD COLUMN     "token" TEXT;
