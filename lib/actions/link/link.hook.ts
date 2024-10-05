import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { deleteLink, getLinks } from "./link.action";

export const getLinksQuery = (workspaceId: string) => {
  return { queryKey: ["getLinks"], queryFn: () => getLinks(workspaceId) } satisfies UseQueryOptions;
}

export const getLinkQuery = (linkId: string) => {
  return { queryKey: ["getLink"], queryFn: () => getLinks(linkId) } satisfies UseQueryOptions;
}

export const deleteLinkQuery = (linkId: string) => {
  return { queryKey: ["deleteLink"], queryFn: () => deleteLink(linkId) } satisfies UseQueryOptions;
}

export const useGetLinks = (workspaceId: string) => {
  return useQuery(getLinksQuery(workspaceId));
}

export const useGetLink = (linkId: string) => {
  return useQuery(getLinkQuery(linkId));
}

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkId: string) => deleteLink(linkId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getLinks"] })
  });
}