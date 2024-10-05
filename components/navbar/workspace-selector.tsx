"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select";
import { useGetWorkspaces } from "@/lib/actions/organization/workspace.hook";
import { useWorkspaceStore } from "@/lib/store/workspace.store";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { HousePlus } from "lucide-react";
import { ReactElement } from "react";
import Link from "next/link";

export const WorkspaceSelector = (): ReactElement => {
  const { status: userStatus } = useSession();
  const { status, data } = useGetWorkspaces();
  const { selectedWorkspaceId, setSelectedWorkspaceId } = useWorkspaceStore();
  const path = usePathname();

  if (status == "pending" || status == "error") {
    return <Skeleton className="w-32 h-8" />
  }

  if (!selectedWorkspaceId && data.length > 0) {
    setSelectedWorkspaceId(data[0].id);
  }

  if (path == "/new-workspace") return <></>;

  return (
    <>
      {data.length > 0 ? (
        <>
          <Select open onValueChange={(value: string) => {
            if (value == "new-workspace") {
              window.location.href = "/new-workspace";
              return;
            }

            setSelectedWorkspaceId(value);
          }} defaultValue={selectedWorkspaceId ?? (data.length > 0 ? data[0].id : undefined)}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select a workspace" />
            </SelectTrigger>
            
            <SelectContent>
              <SelectGroup>
                {data.map(org => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectGroup>

              <SelectSeparator />

              <SelectItem value="new-workspace">
                <span className="flex items-center">
                  <HousePlus className="w-4 h-4 mr-2" />
                  Create a workspace
                </span>
              </SelectItem>
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