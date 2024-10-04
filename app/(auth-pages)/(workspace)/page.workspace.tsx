"use client";

import { useGetWorkspaces } from "@/lib/actions/organization/workspace.hook";
import { redirect } from "next/navigation";
import { ReactElement, useEffect } from "react";
import { WorkspaceLinks } from "./section.links";
import { useWorkspaceStore } from "@/lib/store/workspace.store";
import { WorkspaceLayout } from "./layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, LayoutDashboard } from "lucide-react";

export const WorkspacePage = (): ReactElement => {
  const { data, status } = useGetWorkspaces();
  const { selectedWorkspaceId } = useWorkspaceStore();

  useEffect(() => {
    console.log("Selected workspace id", selectedWorkspaceId);
  }, [selectedWorkspaceId]);
  
  if (status === "pending") return <div>Loading...</div>;
  if (!data || data.length === 0) {
    redirect("/new-workspace");
  }

  return (
    <WorkspaceLayout
      end={<Button variant="outline" className="mr-2">Create a new link</Button>}
      mobileActions={
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Input placeholder="Search links" />
          <div className="flex flex-row gap-2 w-full">
            <Button variant="outline" className="w-full gap-1.5">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <Button variant="outline" className="w-full gap-1.5">
              <LayoutDashboard className="h-4 w-4" />
              Display
            </Button>
          </div>
        </div>
      }
      header="Links"
    >
      <div className="sm:px-2">
        <WorkspaceLinks workspaceId={selectedWorkspaceId || data[0].id} />
      </div>
    </WorkspaceLayout>
  );
}