import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getWorkspaces } from "./workspace.action";

export function getWorkspacesQuery() {
  return { queryKey: ["getWorkspaces"], queryFn: () => getWorkspaces() } satisfies UseQueryOptions;
}

export const useGetWorkspaces = () => {
  return useQuery(getWorkspacesQuery());
}