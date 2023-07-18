import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { LinkButton } from "../../atoms/link-button";
import { BiUserCircle } from "react-icons/bi";
import type { ReactElement } from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export async function Navbar(): Promise<ReactElement> {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="bg-transparent flex justify-between items-center px-4 max-w-screen-xl mx-auto">
      <Link href={"/"} className="flex items-center">
        <Image src="/link.png" alt="logo" width={35} height={35} />
      </Link>

      <div className="flex items-center">
        <Link href={"/pricing"} className="text-gray-300 text-base p-3 hover:text-gray-500 transition-colors duration-200">
          Pricing
        </Link>

        {user ? (
          <Link href={"/dashboard"} className="text-gray-300 text-base p-3 hover:text-gray-500 transition-colors duration-200">
            Dashboard
          </Link>
        ) : (
          <LinkButton variant="primary" href="/sign-in">
            <BiUserCircle className="mr-2" />
          Sign in
          </LinkButton>
        )}
      </div>
    </nav>
  );
}