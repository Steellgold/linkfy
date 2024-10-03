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
        <h1 className="text-4xl font-bold">
          You are not logged in 🚪
        </h1>
        <p className="text-lg text-muted-foreground">
          It seems that you are not logged in. To access this page, you need to sign in.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-4">
          <Link className={buttonVariants({ variant: "outline" })} href="/">
            Go home page
          </Link>

          <SignInModal>
            <Button variant="outline">
              <LogIn className="h-4 w-4 mr-1" />
              Sign in to continue
            </Button>
          </SignInModal>
        </div>
      </div>
    </>
  );
}

export default Page;