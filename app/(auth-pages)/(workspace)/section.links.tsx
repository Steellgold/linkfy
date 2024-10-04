import { Component } from "@/components/component";
import { LinkCard } from "@/components/link-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetWorkspacesLinks } from "@/lib/actions/organization/workspace.hook";

export const WorkspaceLinks: Component<{ workspaceId: string }> = ({ workspaceId }) => {
  const { data, status } = useGetWorkspacesLinks(workspaceId);

  if (status === "pending") return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-16" />
      ))}
    </>
  )

  if (status == "error") return <div>Error</div>;

  if (!data || data.length === 0) return <div>No links</div>;

  return (
    <div className="flex flex-col gap-2">
      {data.map(link => (
        <LinkCard key={link.id} {...link} />
      ))}
    </div>
  )
}