/*
  Warnings:

  - You are about to drop the column `is_active` on the `Productos` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductoStatus" AS ENUM ('PUBLICADO', 'ARCHIVADO', 'ELIMINADO');

-- AlterTable
ALTER TABLE "Productos" DROP COLUMN "is_active",
ADD COLUMN     "estado" "ProductoStatus" NOT NULL DEFAULT 'PUBLICADO',
ALTER COLUMN "portada" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuarios" ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "email" SET DEFAULT '';
