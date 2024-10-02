// hooks/useOrganization.ts
import { OrganizationSchema } from "@/lib/schemas/organization.schema";
import { useOrganizationStore } from "@/lib/store/organization.store";
import { Organization } from "@/lib/types/organization";
import { useQuery } from "@tanstack/react-query";

export const fetchOrganization = async (id: string): Promise<Organization> => {
  const response = await fetch(`/api/auth/organizations?id=${id}`);
  if (!response.ok) {
    throw new Error("Error fetching organization");
  }
  const data = await response.json();
  return OrganizationSchema.parse(data);
};

export const useOrganization = () => {
  const selectedOrganizationId = useOrganizationStore((state) => state.selectedOrganizationId);

  return useQuery<Organization, Error>({
    queryKey: ["organization", selectedOrganizationId],
    queryFn: () => fetchOrganization(selectedOrganizationId!),
    enabled: !!selectedOrganizationId,
  });
};