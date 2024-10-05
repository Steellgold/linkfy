import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { createWorkspace, getWorkspaces, getWorkspacesLinks } from "./workspace.action";
import { CreateWorkspaceMutation } from "./workspace.types";

export const getWorkspacesQuery = () => {
  return { queryKey: ["getWorkspaces"], queryFn: () => getWorkspaces() } satisfies UseQueryOptions;
}

export const getWorkspacesLinksQuery = (workspaceId: string) => {
  return { queryKey: ["getWorkspacesLinks"], queryFn: () => getWorkspacesLinks(workspaceId) } satisfies UseQueryOptions;
}

export const useGetWorkspaces = () => {
  return useQuery(getWorkspacesQuery());
}

export const useGetWorkspacesLinks = (workspaceId: string) => {
  return useQuery(getWorkspacesLinksQuery(workspaceId));
}

// 

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async(data: CreateWorkspaceMutation) => await createWorkspace(data.name, data.startTrial),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getWorkspaces"] })
  });
}