import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { LinkGenerator } from "./_components/link-generator";
import type { Database } from "#/lib/db/database.types";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";
import type { ReactElement } from "react";
import { cookies } from "next/headers";
import { PricingCard } from "./_components/pricing";
import Link from "next/link";
import { RiMotorbikeFill } from "react-icons/ri";

async function getData(): Promise<{ userId: string | null; isPremium: boolean }> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { userId: null, isPremium: false };

  const { data, error } = await supabase
    .from("User")
    .select("isPaid")
    .eq("id", user.id)
    .single();

  if (error) return { userId: null, isPremium: false };
  return { userId: user.id, isPremium: data?.isPaid };
}

const Home = async(): Promise<ReactElement> => {
  const data = await getData();

  return (
    <>
      <Card>
        <div className="p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Shorten your links</h1>
          <Text>Generate your short link with a single click and share it with your friends, customers, or social media.</Text>

          <LinkGenerator isPremium={data.isPremium} userId={data.userId || undefined} />
        </div>
      </Card>

      {!data.isPremium && (<PricingCard showFree={false} />)}

      <div className="mt-4">
        <Link
          href={data?.userId ? "/dashboard" : "/sign-in"}
          className="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
          <RiMotorbikeFill
            size={20}
            className="group-hover:-rotate-45 group-hover:translate-x-40 transition-transform duration-1000 ease-in-out"
          />
          Ride to the history
        </Link>
      </div>
    </>
  );
};

export default Home;