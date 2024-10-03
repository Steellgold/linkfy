import { auth } from "@/auth";
import { SignInModal } from "@/components/signin-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const Page = async(): Promise<ReactElement> => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <>
      <div className="container mx-auto p-4 mt-7 text-center">
        <h1 className="text-4xl font-bold">Successfuly signed out 🫡</h1>
        <p className="text-lg text-muted-foreground">
          It&apos;s sad to see you go, but you can always come back whenever you want !
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-4">
          <Link className={buttonVariants({ variant: "outline" })} href="/">
            Go home page
          </Link>

          <SignInModal>
            <Button variant="outline">
              <LogIn className="h-4 w-4 mr-1" />
              Come back in
            </Button>
          </SignInModal>
        </div>
      </div>
    </>
  );
}

export default Page;