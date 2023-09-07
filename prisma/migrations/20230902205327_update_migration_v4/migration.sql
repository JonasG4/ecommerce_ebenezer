/*
  Warnings:

  - You are about to drop the column `is_facebook` on the `Usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `is_google` on the `Usuarios` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Account_provider" AS ENUM ('GOOGLE', 'FACEBOOK', 'EMAIL');

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "is_facebook",
DROP COLUMN "is_google",
ADD COLUMN     "account_provider" "Account_provider" NOT NULL DEFAULT 'EMAIL',
ALTER COLUMN "password" DROP NOT NULL;
