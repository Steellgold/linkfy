import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "#/lib/db/database.types";
import { LinkButton } from "../../atoms/link-button";
import { LogoutButton } from "../auth/logout-button";
import { BiUserCircle } from "react-icons/bi";
import type { ReactElement } from "react";
import { Text } from "../../atoms/text";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function getData(): Promise<{ userId: string | null; isPremium: boolean }> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { userId: null, isPremium: false };

  const { data, error } = await supabase
    .from("User")
    .select("isPaid")
    .eq("id", user.id)
    .single();

  if (error) {
    return { userId: null, isPremium: false };
  }

  return { userId: user.id, isPremium: data?.isPaid };
}

export async function Navbar(): Promise<ReactElement> {
  const data = await getData();

  return (
    <nav className="bg-transparent flex justify-between items-center px-4 max-w-screen-xl mx-auto">
      <Link href={"/"} className="flex items-center">
        {data.isPremium ? (
          <Image src="/linkplus.png" alt="logo" width={35} height={35} />
        ) : (
          <Image src="/link.png" alt="logo" width={35} height={35} />
        )}
      </Link>

      <div className="flex items-center">
        <Link href={"/pricing"} className="text-gray-300 text-base p-3 hover:text-gray-500 transition-colors duration-200">
          {data.userId ? (
            <>
              <Text className="pro-sm flex items-center gap-2">
                Upgrade
              </Text>
            </>
          ) : (
            "Pricing"
          )}
        </Link>

        {data.userId ? (
          <>
            <Link href={"/dashboard"} className="text-gray-300 text-base p-3 hover:text-gray-500 transition-colors duration-200">
              Dashboard
            </Link>

            <LogoutButton />
          </>
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