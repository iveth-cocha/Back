/*
  Warnings:

  - A unique constraint covering the columns `[tokenSession]` on the table `Mapeo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Mapeo_tokenSession_key" ON "Mapeo"("tokenSession");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_token_key" ON "Usuario"("token");
