import { Component } from "@/components/component";
import { LinkCard } from "@/components/link-card/link-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { ErrorLayoutCard } from "@/components/layout-card";
import { ModalLinkDeleteConfirm } from "@/components/modals/link-delete-confirm.modal-";
import { useGetLinks } from "@/lib/actions/link/link.hook";

export type DisplayOptions = {
  notes: boolean;
  expires: boolean;
  createdBy: boolean;
  createdAt: boolean;
  favicons: boolean;
  tags: boolean;
  clicks: boolean;
}

export type SortOptions = {
  by: "createdAt" | "expires" | "clicks";
  order: "asc" | "desc";
}

export type FilterOptions = {
  tags: string[];
  search: string;
  user: string[];

  sort: SortOptions;
}

type WorkspaceLinksProps = {
  filterBy: FilterOptions;
  display: DisplayOptions;
  workspaceId: string;
}

export const WorkspaceLinks: Component<WorkspaceLinksProps> = ({
  workspaceId,
  filterBy,
  display
}) => {
  const { data, status, refetch } = useGetLinks(workspaceId);

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
        {data.filter((link) => {
          if (filterBy.tags.length > 0) {
            return link.tags.some((tag) => filterBy.tags.includes(tag.id));
          }

          if (filterBy.user.length > 0) {
            return filterBy.user.includes(link.createdBy?.user.id || "");
          }

          if (filterBy.search) {
            return link.original_url.includes(filterBy.search) || link.shortened_url.includes(filterBy.search);
          }

          return true;
        }
        ).map((link) => (  
          <LinkCard key={link.id} {...link} displayOptions={display} />
        ))}
      </div>
    </>
  )
}