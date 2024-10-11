"use client";

import { ReactElement } from "react";
import { WorkspaceLayout } from "../workspace.layout";
import { ErrorLayoutCard } from "@/components/layout-card";

const Page = (): ReactElement => {
  return (
    <WorkspaceLayout header="Tags">
      <ErrorLayoutCard
        title="This page is under construction"
        description="This page is not available yet."
        actions={[]}
      />
    </WorkspaceLayout>
  );
};

export default Page;