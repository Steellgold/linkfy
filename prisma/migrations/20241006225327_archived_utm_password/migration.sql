-- CreateEnum
CREATE TYPE "TargetingType" AS ENUM ('ALL', 'SPECIFIC');

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isProtected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "targetAndroid" TEXT,
ADD COLUMN     "targetIOS" TEXT,
ADD COLUMN     "targetLocation" JSONB,
ADD COLUMN     "targetingType" "TargetingType" NOT NULL DEFAULT 'ALL',
ADD COLUMN     "utm_campaign" TEXT,
ADD COLUMN     "utm_content" TEXT,
ADD COLUMN     "utm_medium" TEXT,
ADD COLUMN     "utm_referral" TEXT,
ADD COLUMN     "utm_source" TEXT,
ADD COLUMN     "utm_term" TEXT;
