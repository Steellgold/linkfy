import { auth } from "@/auth";
import { ReactElement } from "react";
import { PageDemo } from "./page.demo";
import { PageWorkspace } from "./(workspace)/page.workspace";

const Page = async(): Promise<ReactElement> => {
  const session = await auth();
  
  if (session?.user) {
    return <PageWorkspace />;
  }

  return <PageDemo />;
}

export default Page;