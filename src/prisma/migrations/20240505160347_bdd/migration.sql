/*
  Warnings:

  - The values [Regristrador] on the enum `RolEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RolEnum_new" AS ENUM ('Administrador', 'Visualizador', 'Registrador');
ALTER TABLE "Usuario" ALTER COLUMN "Rol" TYPE "RolEnum_new" USING ("Rol"::text::"RolEnum_new");
ALTER TABLE "Mapeo" ALTER COLUMN "Rol" TYPE "RolEnum_new" USING ("Rol"::text::"RolEnum_new");
ALTER TYPE "RolEnum" RENAME TO "RolEnum_old";
ALTER TYPE "RolEnum_new" RENAME TO "RolEnum";
DROP TYPE "RolEnum_old";
COMMIT;
