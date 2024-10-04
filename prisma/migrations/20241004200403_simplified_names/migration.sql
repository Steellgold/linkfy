/*
  Warnings:

  - You are about to drop the column `ogUrl` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `toUrl` on the `Link` table. All the data in the column will be lost.
  - Added the required column `original_url` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortened_url` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "ogUrl",
DROP COLUMN "toUrl",
ADD COLUMN     "original_url" TEXT NOT NULL,
ADD COLUMN     "shortened_url" TEXT NOT NULL;
