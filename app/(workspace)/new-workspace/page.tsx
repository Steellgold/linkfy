import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { ReactElement } from "react";
import { NewWorkspaceCreationForm } from "./new-workspace.form";

const Page = async(): Promise<ReactElement> => {
  const session = await auth();
  if (!session) return redirect("/not-logged");

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            Workspace creation
          </CardTitle>

          <CardDescription>
            Create a new workspace to start shortening your URLs and manage them easily.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <NewWorkspaceCreationForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;