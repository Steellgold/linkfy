import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { archiveLink, deleteLink, getLinks, setPassword, unarchiveLink } from "./link.action";
import { PasswordUpdateMutation } from "./link.types";

export const getLinksQuery = (workspaceId: string) => {
  return { queryKey: ["getLinks"], queryFn: () => getLinks(workspaceId) } satisfies UseQueryOptions;
}

export const getLinkQuery = (linkId: string) => {
  return { queryKey: ["getLink"], queryFn: () => getLinks(linkId) } satisfies UseQueryOptions;
}

export const deleteLinkQuery = (linkId: string) => {
  return { queryKey: ["deleteLink"], queryFn: () => deleteLink(linkId) } satisfies UseQueryOptions;
}

export const archiveLinkQuery = (linkId: string) => {
  return { queryKey: ["archiveLink"], queryFn: () => archiveLink(linkId) } satisfies UseQueryOptions;
}

export const unarchiveLinkQuery = (linkId: string) => {
  return { queryKey: ["unarchiveLink"], queryFn: () => unarchiveLink(linkId) } satisfies UseQueryOptions;
}

//

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

// Archive and unarchive link

export const useArchiveLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkId: string) => archiveLink(linkId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getLinks"] })
  });
}

export const useUnarchiveLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkId: string) => unarchiveLink(linkId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getLinks"] })
  });
}

// Password
export const usePasswordUpdateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PasswordUpdateMutation) => setPassword(data.linkId, data.password),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getLinks"] })
  });
}