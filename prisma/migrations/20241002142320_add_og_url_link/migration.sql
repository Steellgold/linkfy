/*
  Warnings:

  - You are about to drop the column `url` on the `Link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "url",
ADD COLUMN     "ogUrl" TEXT,
ADD COLUMN     "toUrl" TEXT;
