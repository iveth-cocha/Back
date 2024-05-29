-- AlterTable
ALTER TABLE "Agente" ALTER COLUMN "ORD" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Delegacion" ALTER COLUMN "numero_investigacion_previa" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Mapeo" ALTER COLUMN "Orden" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "Orden" DROP NOT NULL;
