"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetWorkspaces } from "@/lib/actions/organization/workspace.hook";
import { useWorkspaceStore } from "@/lib/store/workspace.store";
import { ReactElement } from "react";

export const WorkspaceText = (): ReactElement => {
  const orgsQuery = useGetWorkspaces();
  const { selectedWorkspaceId } = useWorkspaceStore();

  if (orgsQuery.status === "pending" || orgsQuery.status === "error") {
    return <Skeleton className="w-32 h-8" />;
  }

  return (
    <span className="bg-primary/20 px-2 py-0.5 rounded">
      {orgsQuery.data.find((org) => org.id === selectedWorkspaceId)?.name}
    </span>
  );
}