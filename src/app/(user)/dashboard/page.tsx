import { Card } from "#/lib/components/atoms/card";
import { Toaster } from "sonner";
import { LinksTable } from "#/app/_components/link-table";
import type { ReactElement } from "react";
import { linksSchema, type LinksResponseSchema } from "#/lib/utils/api/schema.user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "#/lib/db/database.types";
import { cookies } from "next/headers";
import { prisma } from "#/lib/db/prisma";
import { Button } from "#/lib/components/atoms/button";
import { Text } from "#/lib/components/atoms/text";
import { LinkButton } from "#/lib/components/atoms/link-button";

async function getData(): Promise<LinksResponseSchema> {
  const supabase = createServerComponentClient<Database>({ cookies });
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
        {data.links && data.links.length > 0 && (
          <div className="flex flex-col mt-2 relative overflow-x-auto">
            <LinksTable links={data.links} emptyMessage="You don't have any shortened links yet." />
          </div>
        )}
      </Card>


      <Card
        size={data.links && data.links.length > 0 && data.userId ? "xl" : "sm"}
        variant="disabled"
        className="flex flex-row gap-2">

        <div className="p-0">
          <h1 className="text-2xl font-bold text-white md:text-3xl">API</h1>
          <Text>Generate your API key to use our API and create links from your own application.</Text>

          <div className="flex gap-1.5">
            <Button variant="primary" small className="mt-3">
              Generate API key
            </Button>

            <LinkButton href={"/api"} variant="primary" small className="mt-3">
              Documentation
            </LinkButton>
          </div>
        </div>

        <div className="p-0">
          <h1 className="text-2xl font-bold text-white md:text-3xl">Danger zone</h1>
          <Text>Here you can delete your account and all your shortened links, this action is irreversible.</Text>

          <Button variant="danger" small className="mt-3">
            Delete your account
          </Button>
        </div>
      </Card>
    </>
  );
};

export default HistoryPage;