-- AlterTable
ALTER TABLE "Agente" ALTER COLUMN "ORD" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Delegacion" ALTER COLUMN "recuperacion_bienes_evidencias" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "Orden" DROP NOT NULL;
