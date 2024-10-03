"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { Component } from "../component";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Workspace } from "@prisma/client";

type WorkspacesSelectorProps = {
  workspaces: Workspace[];
  selected: string | undefined;
  status: "pending" | "error" | "success";

  setWorkspaceSelectedId: (id: string) => void;
}

export const WorkspaceSelector: Component<WorkspacesSelectorProps> = ({ workspaces, status, selected, setWorkspaceSelectedId }) => {
  const { status: userStatus } = useSession();
  
  if (status === "pending" || status === "error") {
    return <Skeleton className="w-32 h-8" />
  }

  return (
    <>
      {workspaces.length > 1 ? (
        <>
          <Select
            onValueChange={(value) => setWorkspaceSelectedId(value)}
            defaultValue={selected}
          >
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select a workspace" />
            </SelectTrigger>
            <SelectContent>
              {workspaces.map(org => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : userStatus == "unauthenticated" ? <></> : (
        <Button size="sm" className="w-[260px]">
          Create a workspace
        </Button>
      )}
    </>
  )
}