"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrganizations } from "@/lib/actions/organization/organization.hook";
import { useOrganizationStore } from "@/lib/store/organization.store";
import { ReactElement } from "react";

export const OrganizationText = (): ReactElement => {
  const orgsQuery = useGetOrganizations();
  const { selectedOrganizationId } = useOrganizationStore();

  if (orgsQuery.status === "pending" || orgsQuery.status === "error") {
    return <Skeleton className="w-32 h-8" />;
  }

  return (
    <span className="bg-primary/20 px-2 py-0.5 rounded">
      {orgsQuery.data.find((org) => org.id === selectedOrganizationId)?.name}
    </span>
  );
}