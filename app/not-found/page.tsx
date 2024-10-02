import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ReactElement } from "react";

const Page = (): ReactElement => {
  return (
    <>
      <div className="container mx-auto p-4 mt-7 text-center">
        <h1 className="text-4xl font-bold">This link is broken</h1>
        <p className="text-lg text-muted-foreground">The link you followed may be broken or inexistent.</p>

        <Link className={buttonVariants({ variant: "outline", className: "mt-4" })} href="/">
          Go back to the home page
        </Link>
      </div>
    </>
  );
}

export default Page;