/*
  Warnings:

  - You are about to drop the column `targetingType` on the `Link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "targetingType";

-- DropEnum
DROP TYPE "TargetingType";
