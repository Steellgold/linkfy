"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspace } from "@/components/hooks/use-workspace";

const Page = () => {
  const { data: workspace, isLoading, error } = useWorkspace();

  if  (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Workspace.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <pre>{JSON.stringify(workspace, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;