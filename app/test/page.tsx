"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceStore } from "@/lib/store/workspace.store";
import { useGetWorkspaces } from "@/lib/actions/workspace/workspace.hook";
import { Workspace } from "@prisma/client";

const Page = () => {
  const selectedWorkspaceId = useWorkspaceStore((state) => state.selectedWorkspaceId);
  const { data, status } = useGetWorkspaces();

  if  (status == "pending") return <div>Loading...</div>;
  if (status == "error") return <div>An error occurred</div>;

  const workspace = data.find((workspace: Workspace) => workspace.id === selectedWorkspaceId);

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Workspace.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <pre>{JSON.stringify(workspace, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;