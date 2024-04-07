/*
  Warnings:

  - The primary key for the `Delito` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Localidad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cod_subcircuito` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropIndex
DROP INDEX "Localidad_cod_subcircuito_key";

-- AlterTable
ALTER TABLE "Delito" DROP CONSTRAINT "Delito_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Delito_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Localidad" DROP CONSTRAINT "Localidad_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "cod_subcircuito" DROP NOT NULL,
ALTER COLUMN "cod_subcircuito" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "Localidad_pkey" PRIMARY KEY ("id");
