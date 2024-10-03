import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { createWorkspace, getWorkspaces } from "./workspace.action";

export function getWorkspacesQuery() {
  return { queryKey: ["getWorkspaces"], queryFn: () => getWorkspaces() } satisfies UseQueryOptions;
}

export const useGetWorkspaces = () => {
  return useQuery(getWorkspacesQuery());
}

// 

type CreateWorkspaceMutation = {
  name: string;
  startTrial: boolean;
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async(data: CreateWorkspaceMutation) => await createWorkspace(data.name, data.startTrial),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getWorkspaces"] })
  });
}