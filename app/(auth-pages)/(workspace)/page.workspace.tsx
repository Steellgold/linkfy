"use client";

import { useGetWorkspaces } from "@/lib/actions/organization/workspace.hook";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

export const WorkspacePage = (): ReactElement => {
  const { data, status } = useGetWorkspaces();

  if (status === "pending") return <div>Loading...</div>;
  if (!data || data.length === 0) {
    redirect("/new-workspace");
  }

  return (
    <div>
      <h1>Workspace</h1>
    </div>
  );
}