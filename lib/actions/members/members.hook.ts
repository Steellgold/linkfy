import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getMembers } from "./members.action";

export const getMembersQuery = (workspaceId: string) => {
  return { queryKey: ["getMembers"], queryFn: () => getMembers(workspaceId) } satisfies UseQueryOptions;
}

export const useGetMembers = (workspaceId: string) => {
  return useQuery(getMembersQuery(workspaceId));
}