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
import clsx from "clsx";

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


      <div className={clsx(
        "flex flex-col items-center mx-auto",
        "grid grid-cols-1 md:grid-cols-2 gap-3 mt-3",
        {
          "sm:max-w-3xl": data.links && data.links.length > 0 && data.userId,
          "sm:max-w-md": data.links && data.links.length == 0 && data.userId
        }
      )}>

        <Card className="p-0">
          <h1 className="text-2xl font-bold text-white md:text-2xl">API</h1>
          <Text>Generate your API key to use our API and create links from your own application.</Text>

          <div className="flex gap-1.5">
            <Button variant="primary" small className="mt-3">
              Generate API key
            </Button>

            <LinkButton href={"/api"} variant="primary" small className="mt-3">
              Documentation
            </LinkButton>
          </div>
        </Card>

        <Card className="p-0">
          <h1 className="text-2xl font-bold text-white md:text-2xl">Subdomains</h1>
          <Text>Manage your subdomains and create new ones, you can also set a default subdomain.</Text>

          <Button variant="primary" small className="mt-3">
            Create subdomain
          </Button>
        </Card>

        <Card className="p-0" variant="premium">
          <h1 className="text-2xl font-bold text-white md:text-2xl">Linkfy <span className="premium">Premium</span></h1>

          <Button variant="primary" small className="mt-3">
            Upgrade to premium
          </Button>
        </Card>

        <Card className="p-0">
          <h1 className="text-2xl font-bold text-white md:text-2xl">Danger zone</h1>
          <Text>Here you can delete your account and all your shortened links, this action is irreversible.</Text>

          <Button variant="danger" small className="mt-3">
            Delete your account
          </Button>
        </Card>
      </div>
    </>
  );
};

export default HistoryPage;