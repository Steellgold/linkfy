"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetWorkspaces } from "@/lib/actions/organization/workspace.hook";
import { redirect } from "next/navigation";
import { ReactElement } from "react";
import { WorkspaceLinks } from "./section.links";

export const WorkspacePage = (): ReactElement => {
  const { data, status } = useGetWorkspaces();

  if (status === "pending") return <div>Loading...</div>;
  if (!data || data.length === 0) {
    redirect("/new-workspace");
  }

  return (
    <Tabs defaultValue="links">
      <TabsList className="flex flex-row justify-start gap-0 sm:gap-0.5">
        <TabsTrigger value="links">Links</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <div className="p-1">
        <TabsContent value="links">
          <WorkspaceLinks workspaceId={data[0].id} />
        </TabsContent>
      </div>
      {/* <TabsContent value="analytics">
        <div className="p-1">
          <p className="text-sm">Your app&apos;s metrics will be available here soon.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-1">
          <p className="text-sm">Your app&apos;s engagement metrics will be available here soon.</p>
        </div>
      </TabsContent> */}
    </Tabs>
  );
}