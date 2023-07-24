import { Text } from "#/lib/components/atoms/text";
import { Card } from "#/lib/components/atoms/card";
import { Toaster } from "sonner";
import Link from "next/link";
import clsx from "clsx";
import { LinksTable } from "#/app/_components/link-table";
import type { ReactElement } from "react";
import { linksSchema, type LinksResponseSchema } from "#/lib/utils/api/schema.user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "#/lib/db/database.types";
import { prisma } from "#/lib/db/prisma";

async function getData(): Promise<LinksResponseSchema> {
  const supabase = createClientComponentClient<Database>();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { links: [], userId: null };

  const result = await prisma.link.findMany({
    where: {
      userId: user.id
    },
    select: {
      slug: true,
      url: true,
      createdAt: true,
      clicks: true,
      disabled: true,
      expireAt: true,
      maxUses: true,
      password: true,
      subdomain: true
    }
  });

  if (!result) return { links: [], userId: null };
  const parsed = linksSchema.safeParse({ links: result, userId: user.id });
  if (!parsed.success) return { links: [], userId: null };

  return {
    links: parsed.data.links,
    userId: user.id
  };
}

const HistoryPage = async(): Promise<ReactElement> => {
  const data = await getData();

  return (
    <>
      <Toaster />

      <Card size={data.links && data.links.length > 0 && data.userId ? "xl" : "sm"} className="bg-gray-800">
        <div className={clsx("p-0", { "mb-2": data.links && data.links.length > 0 })}>
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">History</h1>
          <>
            {data.userId && (
              <>
                {data.links && data.links.length > 0 ? (
                  <Text>This is your history page, you can see all your links here, and you can also delete them.</Text>
                ) : (
                  <Text>You don&apos;t have any shortened links yet.</Text>
                )}
              </>
            ) || (
              <Text>
              You need to login to see your history page, <Link href="/login" className="text-blue-500 hover:underline">click here</Link> to login.
              </Text>
            )}
          </>
        </div>

        {data.links && data.links.length > 0 && (
          <div className="flex flex-col mt-2">
            <div className="relative overflow-x-auto">
              <LinksTable links={data.links} emptyMessage="You don't have any shortened links yet." />
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export default HistoryPage;