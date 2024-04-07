-- CreateEnum
CREATE TYPE "RolEnum" AS ENUM ('ADMINISTRADOR', 'VISUALIZADOR', 'REGISTRADOR');

-- CreateTable
CREATE TABLE "Agente" (
    "Cedula" INTEGER NOT NULL,
    "Apellido_Nombre" TEXT NOT NULL,
    "Grado" TEXT NOT NULL,

    CONSTRAINT "Agente_pkey" PRIMARY KEY ("Cedula")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Rol" "RolEnum" NOT NULL,
    "agenteID" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mapeo" (
    "id" SERIAL NOT NULL,
    "agenteID" INTEGER NOT NULL,
    "Cedula" INTEGER NOT NULL,
    "Apellido_Nombre" TEXT NOT NULL,
    "Grado" TEXT NOT NULL,
    "Rol" "RolEnum" NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accionRealizada" TEXT NOT NULL,

    CONSTRAINT "Mapeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delegacion" (
    "id" SERIAL NOT NULL,
    "anio_ingreso" INTEGER NOT NULL,
    "orden" INTEGER NOT NULL,
    "mes_ingreso" TEXT,
    "numero_investigacion_previa" TEXT,
    "numero_instruccion_fiscal" TEXT,
    "grado_agente" TEXT NOT NULL,
    "apellidos_nombres_agente" TEXT NOT NULL,
    "zona" TEXT,
    "provincia" TEXT,
    "canton" TEXT,
    "cod_distrito" TEXT,
    "distrito" TEXT,
    "tipo_delito" TEXT,
    "delito_tipificado_delegacion" TEXT,
    "delito_desagregacion_policia_judicial" TEXT,
    "fecha_infraccion_delito" TIMESTAMP(3),
    "apellidos_nombres_victima" TEXT,
    "sexo_victima" TEXT,
    "edad_victima" INTEGER,
    "apellidos_nombres_sospechoso" TEXT,
    "condicion_infractor_involucrado" TEXT,
    "parentesco_detenido_sospechoso_victima" TEXT,
    "alias_sospechoso" TEXT,
    "placa_vehiculo_involucrado" TEXT,
    "apellidos_nombres_fiscal" TEXT,
    "unidad_especializada" TEXT,
    "fecha_delegacion" TIMESTAMP(3),
    "fecha_recepcion_pj" TIMESTAMP(3),
    "fecha_recepcion_agente_investigador" TIMESTAMP(3),
    "no_oficio_recibe_diligencia" TEXT,
    "plazo_otorgado_dias" TEXT,
    "numero_articulo" TEXT,
    "articulos_cumplidos" TEXT,
    "cumplimiento_parcial" TEXT,
    "cumplimiento_total" TEXT,
    "fecha_cumplimiento" TIMESTAMP(3),
    "en_investigacion" TEXT,
    "numero_oficio_descargo" TEXT,
    "versiones" INTEGER,
    "reconocimientos_lugar_hechos" INTEGER,
    "determino_posibles_responsables" TEXT,
    "comparecencia_sospechoso" TEXT,
    "peticiones_fiscalia" TEXT,
    "tipo_peticion" TEXT,
    "no_boletas_solicitadas" INTEGER,
    "nombre_requerido_boleta" TEXT,
    "no_detenidos_producto_investigacion" INTEGER,
    "apellidos_nombres_detenidos_producto" TEXT,
    "allanamientos_numero" INTEGER,
    "recuperacion_bienes_evidencias" INTEGER,
    "recuperacion_automotores" INTEGER,
    "recuperacion_otros" INTEGER,
    "peritajes" INTEGER,
    "notificaciones" INTEGER,
    "citaciones" INTEGER,
    "traslados" INTEGER,
    "informe_descargo" TEXT,
    "causas_incumplimiento_investigacion" TEXT,
    "observaciones" TEXT,
    "cantidad_sustraida" TEXT,
    "entidad_financiera" TEXT,
    "agenteID" INTEGER NOT NULL,

    CONSTRAINT "Delegacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localidad" (
    "cod_subcircuito" TEXT NOT NULL,
    "zona" TEXT,
    "subzona" TEXT,
    "canton" TEXT,
    "cod_distrito" TEXT,
    "distrito" TEXT,
    "circuito" TEXT,
    "sub_circuito" TEXT,
    "cod_circuito" TEXT,

    CONSTRAINT "Localidad_pkey" PRIMARY KEY ("cod_subcircuito")
);

-- CreateTable
CREATE TABLE "Delito" (
    "delito" TEXT NOT NULL,
    "seccion" TEXT,

    CONSTRAINT "Delito_pkey" PRIMARY KEY ("delito")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agente_Cedula_key" ON "Agente"("Cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Localidad_cod_subcircuito_key" ON "Localidad"("cod_subcircuito");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_agenteID_fkey" FOREIGN KEY ("agenteID") REFERENCES "Agente"("Cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapeo" ADD CONSTRAINT "Mapeo_agenteID_fkey" FOREIGN KEY ("agenteID") REFERENCES "Agente"("Cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegacion" ADD CONSTRAINT "Delegacion_agenteID_fkey" FOREIGN KEY ("agenteID") REFERENCES "Agente"("Cedula") ON DELETE RESTRICT ON UPDATE CASCADE;
