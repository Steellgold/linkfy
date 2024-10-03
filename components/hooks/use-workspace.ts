import { WorkspaceSchema } from "@/lib/schemas/workspace.schema";
import { useWorkspaceStore } from "@/lib/store/workspace.store";
import { Workspace } from "@/lib/types/workspace";
import { useQuery } from "@tanstack/react-query";

export const fetchWorkspace = async (id: string): Promise<Workspace> => {
  const response = await fetch(`/api/auth/workspaces?id=${id}`);
  if (!response.ok) {
    throw new Error("Error fetching Workspace");
  }
  const data = await response.json();
  return WorkspaceSchema.parse(data);
};

export const useWorkspace = () => {
  const selectedWorkspaceId = useWorkspaceStore((state) => state.selectedWorkspaceId);

  return useQuery<Workspace, Error>({
    queryKey: ["workspace", selectedWorkspaceId],
    queryFn: () => fetchWorkspace(selectedWorkspaceId!),
    enabled: !!selectedWorkspaceId,
  });
};