import { Component } from "@/components/component";
import { LinkCard } from "@/components/link-card/link-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetWorkspacesLinks } from "@/lib/actions/organization/workspace.hook";
import { useEffect } from "react";
import { ErrorLayoutCard } from "@/components/layout-card";
import { ModalLinkDeleteConfirm } from "@/components/modals/link-delete-confirm.modal-";

export const WorkspaceLinks: Component<{ workspaceId: string }> = ({ workspaceId }) => {
  const { data, status, refetch } = useGetWorkspacesLinks(workspaceId);

  useEffect(() => {
    refetch();
  }, [workspaceId, refetch]);

  if (status === "pending") return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-16" />
      ))}
    </div>
  )

  if (status === "error") return <div>Error</div>;

  if (!data || data.length === 0) return (
    <ErrorLayoutCard
      title="Workspace is empty 😳"
      description="It seems that you don't have any links in this workspace. Create a new link to get started."
      actions={[
        <Button key={1} variant="outline">Create a new link</Button>
      ]}
    />
  )

  return (
    <>
      <ModalLinkDeleteConfirm />

      <div className="flex flex-col gap-1.5 mb-1.5 p-2 rounded-xl sm:bg-primary/5 sm:dark:bg-primary/5">
        {data.map((link) => (
          <LinkCard key={link.id} {...link} userOptions={{
            showTags: true,
            showExpires: true,
            showCreatedAt: true,
            showCreatedBy: true,
            showNote: true
          }} />
        ))}
      </div>
    </>
  )
}