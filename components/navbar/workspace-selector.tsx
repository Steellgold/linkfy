"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { buttonVariants } from "../ui/button";
import { useSession } from "next-auth/react";
import { useGetWorkspaces } from "@/lib/actions/organization/workspace.hook";
import { ReactElement } from "react";
import { useWorkspaceStore } from "@/lib/store/workspace.store";
import Link from "next/link";

export const WorkspaceSelector = (): ReactElement => {
  const { status: userStatus } = useSession();
  const { status, data } = useGetWorkspaces();
  const { selectedWorkspaceId, setSelectedWorkspaceId } = useWorkspaceStore();

  if (status == "pending" || status == "error") {
    return <Skeleton className="w-32 h-8" />
  }

  if (!selectedWorkspaceId && data.length > 0) {
    setSelectedWorkspaceId(data[0].id);
  }

  return (
    <>
      {data.length > 0 ? (
        <>
          <Select onValueChange={(value) => setSelectedWorkspaceId(value)} defaultValue={selectedWorkspaceId ?? (data.length > 0 ? data[0].id : undefined)}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select a workspace" />
            </SelectTrigger>
            <SelectContent>
              {data.map(org => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : userStatus == "unauthenticated" ? <></> : (
        <Link href={"/new-workspace"} className={buttonVariants({ variant: "default", size: "sm", className: "w-[260px]" })}>
          Create a workspace
        </Link>
      )}
    </>
  )
}