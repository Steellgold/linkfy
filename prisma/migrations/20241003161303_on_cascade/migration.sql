-- DropForeignKey
ALTER TABLE "Trial" DROP CONSTRAINT "Trial_workspaceId_fkey";

-- AddForeignKey
ALTER TABLE "Trial" ADD CONSTRAINT "Trial_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
