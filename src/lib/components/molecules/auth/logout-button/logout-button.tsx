"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "#/lib/components/atoms/button";
import { BiLogOutCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";

export const LogoutButton = (): ReactElement => {
  const router = useRouter();

  const supabase = createClientComponentClient();

  const signOut = async(): Promise<void> => {
    console.log("signing out");
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Button variant="transparent" onClick={() => signOut()} className="text-gray-300 hover:text-red-600 p-4 text-base">
      <BiLogOutCircle className="mr-2 h-5 w-5" />
    </Button>
  );
};