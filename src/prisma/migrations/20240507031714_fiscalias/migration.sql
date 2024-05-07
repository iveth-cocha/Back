-- AlterTable
CREATE SEQUENCE ficalia_id_seq;
ALTER TABLE "Ficalia" ALTER COLUMN "id" SET DEFAULT nextval('ficalia_id_seq');
ALTER SEQUENCE ficalia_id_seq OWNED BY "Ficalia"."id";
