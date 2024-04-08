-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "confirmEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token" TEXT NOT NULL DEFAULT '';
