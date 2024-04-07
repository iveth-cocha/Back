/*
  Warnings:

  - You are about to alter the column `Apellido_Nombre` on the `Agente` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Grado` on the `Agente` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `numero_investigacion_previa` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `numero_instruccion_fiscal` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `grado_agente` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `apellidos_nombres_agente` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `zona` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `provincia` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `canton` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cod_distrito` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `distrito` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `tipo_delito` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `delito_tipificado_delegacion` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `delito_desagregacion_policia_judicial` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `apellidos_nombres_victima` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `sexo_victima` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `apellidos_nombres_sospechoso` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `condicion_infractor_involucrado` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `parentesco_detenido_sospechoso_victima` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `alias_sospechoso` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `placa_vehiculo_involucrado` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `apellidos_nombres_fiscal` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `unidad_especializada` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `no_oficio_recibe_diligencia` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The `plazo_otorgado_dias` column on the `Delegacion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `numero_articulo` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `articulos_cumplidos` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cumplimiento_parcial` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cumplimiento_total` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `en_investigacion` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `numero_oficio_descargo` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `determino_posibles_responsables` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `comparecencia_sospechoso` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `peticiones_fiscalia` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `tipo_peticion` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `nombre_requerido_boleta` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `apellidos_nombres_detenidos_producto` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `informe_descargo` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `causas_incumplimiento_investigacion` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `observaciones` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cantidad_sustraida` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `entidad_financiera` on the `Delegacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `Delito` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `delito` on the `Delito` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `seccion` on the `Delito` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `zona` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `subzona` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `canton` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cod_distrito` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `distrito` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `circuito` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `sub_circuito` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cod_circuito` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Apellido_Nombre` on the `Mapeo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Grado` on the `Mapeo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `accionRealizada` on the `Mapeo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `nombre` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Agente" ALTER COLUMN "Apellido_Nombre" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "Grado" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Delegacion" ALTER COLUMN "numero_investigacion_previa" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "numero_instruccion_fiscal" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "grado_agente" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "apellidos_nombres_agente" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "zona" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "provincia" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "canton" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cod_distrito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "distrito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "tipo_delito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "delito_tipificado_delegacion" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "delito_desagregacion_policia_judicial" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "apellidos_nombres_victima" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "sexo_victima" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "apellidos_nombres_sospechoso" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "condicion_infractor_involucrado" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "parentesco_detenido_sospechoso_victima" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "alias_sospechoso" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "placa_vehiculo_involucrado" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "apellidos_nombres_fiscal" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "unidad_especializada" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "no_oficio_recibe_diligencia" SET DATA TYPE VARCHAR(255),
DROP COLUMN "plazo_otorgado_dias",
ADD COLUMN     "plazo_otorgado_dias" INTEGER,
ALTER COLUMN "numero_articulo" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "articulos_cumplidos" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cumplimiento_parcial" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cumplimiento_total" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "en_investigacion" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "numero_oficio_descargo" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "determino_posibles_responsables" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "comparecencia_sospechoso" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "peticiones_fiscalia" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "tipo_peticion" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "nombre_requerido_boleta" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "apellidos_nombres_detenidos_producto" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "informe_descargo" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "causas_incumplimiento_investigacion" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "observaciones" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cantidad_sustraida" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "entidad_financiera" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Delito" DROP CONSTRAINT "Delito_pkey",
ALTER COLUMN "delito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "seccion" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "Delito_pkey" PRIMARY KEY ("delito");

-- AlterTable
ALTER TABLE "Localidad" ALTER COLUMN "zona" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "subzona" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "canton" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cod_distrito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "distrito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "circuito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "sub_circuito" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cod_circuito" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Mapeo" ALTER COLUMN "Apellido_Nombre" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "Grado" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "accionRealizada" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);
