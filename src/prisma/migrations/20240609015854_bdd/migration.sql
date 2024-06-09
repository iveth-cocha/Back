-- DropForeignKey
ALTER TABLE "Mapeo" DROP CONSTRAINT "Mapeo_agenteID_fkey";

-- DropForeignKey
ALTER TABLE "Mapeo" DROP CONSTRAINT "Mapeo_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Mapeo" ALTER COLUMN "usuarioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mapeo" ADD CONSTRAINT "Mapeo_agenteID_fkey" FOREIGN KEY ("agenteID") REFERENCES "Agente"("Cedula") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapeo" ADD CONSTRAINT "Mapeo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
