import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ReactElement } from "react";
import { ErrorLayoutCard } from "@/components/layout-card";

const Page = async(): Promise<ReactElement> => {
  return <ErrorLayoutCard
    title="This link is broken"
    description="The link you followed may be broken or inexistent."
    actions={[
      <Link key={0} className={buttonVariants({ variant: "outline" })} href="/">Go home page</Link>
    ]}
  />
}

export default Page;