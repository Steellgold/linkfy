-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "maxClicks" DROP NOT NULL,
ALTER COLUMN "errorRedirectUrl" DROP NOT NULL,
ALTER COLUMN "iosUrl" DROP NOT NULL,
ALTER COLUMN "androidUrl" DROP NOT NULL;
