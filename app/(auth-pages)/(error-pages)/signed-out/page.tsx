import { auth } from "@/auth";
import { SignInModal } from "@/components/signin-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactElement } from "react";
import { ErrorLayoutCard } from "@/components/layout-card";

const Page = async(): Promise<ReactElement> => {
  const session = await auth();
  if (session) redirect("/");

  return <ErrorLayoutCard
    title="Successfuly signed out 🫡"
    description="It&apos;s sad to see you go, but you can always come back whenever you want !"
    actions={[
      <Link key={0} className={buttonVariants({ variant: "outline" })} href="/">Go home page</Link>,
      <SignInModal key={1}>
        <Button variant="outline">
          <LogIn className="h-4 w-4 mr-1" />
          Come back in
        </Button>
      </SignInModal>
    ]}
  />
}

export default Page;