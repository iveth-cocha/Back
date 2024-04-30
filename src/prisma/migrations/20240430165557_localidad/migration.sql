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
