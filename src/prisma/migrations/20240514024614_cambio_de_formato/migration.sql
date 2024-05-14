-- AlterTable
ALTER TABLE "Agente" ALTER COLUMN "FechaNacimiento" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Delegacion" ALTER COLUMN "fecha_infraccion_delito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fecha_delegacion" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fecha_recepcion_pj" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fecha_recepcion_agente_investigador" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fecha_cumplimiento" SET DATA TYPE VARCHAR(255);
