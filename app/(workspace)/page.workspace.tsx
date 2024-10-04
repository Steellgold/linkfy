import { useGetWorkspaces } from "@/lib/actions/organization/workspace.hook";
import { redirect } from "next/navigation";
import { ReactElement, useEffect } from "react";
import { WorkspaceLinks } from "./section.links";
import { useWorkspaceStore } from "@/lib/store/workspace.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, LayoutDashboard, Plus } from "lucide-react";
import { WorkspaceLayout } from "./workspace.layout";

export const WorkspaceLinksPage = (): ReactElement => {
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
      actions={
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Input placeholder="Search links" />
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-1.5">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <Button variant="outline" className="w-full sm:w-auto gap-1.5">
              <LayoutDashboard className="h-4 w-4" />
              Display
            </Button>
          </div>
        </div>
      }
      mobileAction={
        <Button className="gap-1.5" variant="outline">
          <Plus className="h-4 w-4" />
          New link
        </Button>
      }
      header="Links"
    >
      <div className="sm:px-2">
        <WorkspaceLinks workspaceId={selectedWorkspaceId || data[0].id} />
      </div>
    </WorkspaceLayout>
  );
};
