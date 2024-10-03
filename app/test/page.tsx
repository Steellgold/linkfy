"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrganization } from "@/components/hooks/use-organization";

const Page = () => {
  const { data: organization, isLoading, error } = useOrganization();

  if  (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Organizations.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <pre>{JSON.stringify(organization, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;