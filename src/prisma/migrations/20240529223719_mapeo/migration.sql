/*
  Warnings:

  - Added the required column `usuarioId` to the `Mapeo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mapeo" ADD COLUMN     "usuarioId" INTEGER NOT NULL,
ALTER COLUMN "fechaHoraS" DROP NOT NULL,
ALTER COLUMN "fechaHoraS" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Mapeo" ADD CONSTRAINT "Mapeo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
