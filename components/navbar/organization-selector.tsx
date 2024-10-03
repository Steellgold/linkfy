"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Organization } from "@prisma/client"
import { Skeleton } from "../ui/skeleton";
import { Component } from "../component";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

type OrganizationSelectorProps = {
  organizations: Organization[];
  selected: string | undefined;
  status: "pending" | "error" | "success";

  setSelectedOrganizationId: (id: string) => void;
}

export const OrganizationSelector: Component<OrganizationSelectorProps> = ({ organizations, status, selected, setSelectedOrganizationId }) => {
  const { status: userStatus } = useSession();
  
  if (status === "pending" || status === "error") {
    return <Skeleton className="w-32 h-8" />
  }

  return (
    <>
      {organizations.length > 1 ? (
        <>
          <Select
            onValueChange={(value) => setSelectedOrganizationId(value)}
            defaultValue={selected}
          >
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent>
              {organizations.map(org => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : userStatus == "unauthenticated" ? <></> : (
        <Button size="sm" className="w-[260px]">
          Create organization
        </Button>
      )}
    </>
  )
}