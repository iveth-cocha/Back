-- CreateEnum
CREATE TYPE "RolEnum" AS ENUM ('Administrador', 'Visualizador', 'Regristrador');

-- CreateTable
CREATE TABLE "Agente" (
    "Cedula" INTEGER NOT NULL,
    "Direcion_Unidad" VARCHAR(255),
    "Grado" VARCHAR(255),
    "Apellido_Nombre" VARCHAR(255),
    "Zona" VARCHAR(255),
    "SubZona" VARCHAR(255),
    "Distrito_Canton" VARCHAR(255),
    "PaseDNTH" VARCHAR(255),
    "Funcion" VARCHAR(255),
    "Novedad" VARCHAR(255),
    "Detalle" VARCHAR(255),
    "Documento" VARCHAR(255),
    "Titulo" VARCHAR(255),
    "IdiomaExtranjero" VARCHAR(255),
    "Licencia" VARCHAR(255),
    "Residencia" VARCHAR(255),
    "Estado_Civil" VARCHAR(255),
    "FechaNacimiento" TIMESTAMP(3),
    "Genero" VARCHAR(255),
    "Telefono" INTEGER NOT NULL,
    "Email" VARCHAR(255),
    "NombresFamiliar" VARCHAR(255),
    "Parentesco" VARCHAR(255),
    "TelefonoFamiliar" INTEGER NOT NULL,
    "Terno" INTEGER NOT NULL,
    "Camisa" INTEGER NOT NULL,
    "Calzado" INTEGER NOT NULL,
    "Cabeza" INTEGER NOT NULL,

    CONSTRAINT "Agente_pkey" PRIMARY KEY ("Cedula")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "Grado" VARCHAR(255),
    "nombre" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "Rol" "RolEnum" NOT NULL,
    "agenteID" INTEGER NOT NULL,
    "token" TEXT,
    "confirmEmail" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mapeo" (
    "id" SERIAL NOT NULL,
    "agenteID" INTEGER NOT NULL,
    "Cedula" INTEGER NOT NULL,
    "Apellido_Nombre" VARCHAR(255) NOT NULL,
    "Grado" VARCHAR(255) NOT NULL,
    "Rol" "RolEnum" NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accionRealizada" VARCHAR(255) NOT NULL,

    CONSTRAINT "Mapeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delegacion" (
    "id" SERIAL NOT NULL,
    "anio_ingreso" INTEGER,
    "orden" INTEGER,
    "mes_ingreso" TEXT,
    "numero_investigacion_previa" VARCHAR(255),
    "numero_instruccion_fiscal" VARCHAR(255),
    "zona" VARCHAR(255),
    "provincia" VARCHAR(255),
    "canton" VARCHAR(255),
    "cod_distrito" VARCHAR(255),
    "distrito" VARCHAR(255),
    "grado_agente" VARCHAR(255) NOT NULL,
    "apellidos_nombres_agente" VARCHAR(255) NOT NULL,
    "tipo_delito" VARCHAR(255),
    "delito_tipificado_delegacion" VARCHAR(255),
    "delito_desagregacion_policia_judicial" VARCHAR(255),
    "fecha_infraccion_delito" TIMESTAMP(3),
    "apellidos_nombres_victima" VARCHAR(255),
    "sexo_victima" VARCHAR(255),
    "edad_victima" INTEGER,
    "apellidos_nombres_sospechoso" VARCHAR(255),
    "condicion_infractor_involucrado" VARCHAR(255),
    "parentesco_detenido_sospechoso_victima" VARCHAR(255),
    "alias_sospechoso" VARCHAR(255),
    "placa_vehiculo_involucrado" VARCHAR(255),
    "apellidos_nombres_fiscal" VARCHAR(255),
    "unidad_especializada" VARCHAR(255),
    "fecha_delegacion" TIMESTAMP(3),
    "fecha_recepcion_pj" TIMESTAMP(3),
    "fecha_recepcion_agente_investigador" TIMESTAMP(3),
    "no_oficio_recibe_diligencia" VARCHAR(255),
    "plazo_otorgado_dias" INTEGER,
    "numero_articulo" VARCHAR(255),
    "articulos_cumplidos" VARCHAR(255),
    "cumplimiento_parcial" VARCHAR(255),
    "cumplimiento_total" VARCHAR(255),
    "fecha_cumplimiento" TIMESTAMP(3),
    "en_investigacion" VARCHAR(255),
    "numero_oficio_descargo" VARCHAR(255),
    "versiones" INTEGER,
    "reconocimientos_lugar_hechos" INTEGER,
    "determino_posibles_responsables" VARCHAR(255),
    "comparecencia_sospechoso" VARCHAR(255),
    "peticiones_fiscalia" VARCHAR(255),
    "tipo_peticion" VARCHAR(255),
    "no_boletas_solicitadas" INTEGER,
    "nombre_requerido_boleta" VARCHAR(255),
    "no_detenidos_producto_investigacion" INTEGER,
    "apellidos_nombres_detenidos_producto" VARCHAR(255),
    "allanamientos_numero" INTEGER,
    "recuperacion_bienes_evidencias" INTEGER,
    "recuperacion_automotores" INTEGER,
    "recuperacion_otros" INTEGER,
    "peritajes" INTEGER,
    "notificaciones" INTEGER,
    "citaciones" INTEGER,
    "traslados" INTEGER,
    "informe_descargo" VARCHAR(255),
    "causas_incumplimiento_investigacion" VARCHAR(255),
    "nombre_detenidos_producto_investigacion" VARCHAR(255),
    "observaciones" VARCHAR(255),
    "cantidad_sustraida" VARCHAR(255),
    "entidad_financiera" VARCHAR(255),

    CONSTRAINT "Delegacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delito" (
    "id" SERIAL NOT NULL,
    "delito" VARCHAR(255) NOT NULL,
    "seccion" VARCHAR(255),

    CONSTRAINT "Delito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localidad" (
    "id" SERIAL NOT NULL,
    "zona" VARCHAR(255),
    "subzona" VARCHAR(255),
    "canton" VARCHAR(255),
    "cod_distrito" VARCHAR(255),
    "distrito" VARCHAR(255),

    CONSTRAINT "Localidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficalia" (
    "id" INTEGER NOT NULL,
    "provincia" VARCHAR(255) NOT NULL,
    "N_fiscalia" VARCHAR(255) NOT NULL,

    CONSTRAINT "Ficalia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agente_Cedula_key" ON "Agente"("Cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_agenteID_fkey" FOREIGN KEY ("agenteID") REFERENCES "Agente"("Cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapeo" ADD CONSTRAINT "Mapeo_agenteID_fkey" FOREIGN KEY ("agenteID") REFERENCES "Agente"("Cedula") ON DELETE RESTRICT ON UPDATE CASCADE;
