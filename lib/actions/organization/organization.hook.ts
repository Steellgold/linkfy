import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getOrganizations } from "./organization.action";

export function getOrganizationsQuery() {
  return { queryKey: ["getOrganizations"], queryFn: () => getOrganizations() } satisfies UseQueryOptions;
}

export const useGetOrganizations = () => {
  return useQuery(getOrganizationsQuery());
}