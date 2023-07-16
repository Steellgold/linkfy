"use client";

import type { ReactElement } from "react";
import { Card } from "#/lib/components/atoms/card";
import { Input } from "#/lib/components/atoms/input";
import { Text } from "#/lib/components/atoms/text";
import { Button } from "#/lib/components/atoms/button";
import { RiVipDiamondLine } from "react-icons/ri";

const EditPage = (): ReactElement => {
  const isPremium = false;

  type LinkItem = {
    url: string;
    shortUrl: string;
    password: string | null;
    subdomain: string | null;
  };

  const link: LinkItem = {
    url: "https://google.com",
    shortUrl: "eA3d",
    password: "a89s1345az",
    subdomain: null
  };

  return (
    <>
      <Card size="md">
        <div className="p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Edit your link</h1>
          <Text>
            Modify the destination URL of your shortcut link or add access security to it.
            If you want other options like this.
          </Text>
          <Text className="mt-1 flex items-center gap-1">
            Input fields marked with
            <RiVipDiamondLine className="text-yellow-500" />
            are only available to <span className="pro">Linkfy Plus</span> users.
          </Text>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            name="url"
            autoFocus={true}
            placeholder="URL"
            disabled={false}
            className="w-full"
            value={link.url}
          />

          <Input
            type="text"
            name="shortUrl"
            placeholder="Short URL"
            disabled={true}
            className="w-full"
            text="linkfy.fr/"
            value={link.shortUrl}
            premiumIndicator={!isPremium}
          />
        </div>

        <div className="flex gap-2 mt-2">
          <Input
            type="date"
            name="expirationDate"
            placeholder="Expiration date"
            disabled={!isPremium}
            premiumIndicator={!isPremium}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            disabled={!isPremium}
            className="w-full"
            defaultValue="abcdefgh"
            premiumIndicator={!isPremium}
          />
        </div>

        <div className="flex gap-2 mt-2">
          <Button className="w-full">
            Save
          </Button>
        </div>
      </Card>
    </>
  );
};

export default EditPage;