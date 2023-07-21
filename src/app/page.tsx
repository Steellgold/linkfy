"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PremiumContext } from "#/lib/contexts/is-premium";
import type { Database } from "#/lib/db/database.types";
import { Button } from "#/lib/components/atoms/button";
import { Input } from "#/lib/components/atoms/input";
import { useState, type ReactElement } from "react";
import { PricingCard } from "./_components/pricing";
import { Text } from "#/lib/components/atoms/text";
import { Card } from "#/lib/components/atoms/card";
import { useCopyToClipboard } from "usehooks-ts";
import { RiMotorbikeFill } from "react-icons/ri";
import { BsFillGearFill } from "react-icons/bs";
import { BiLink, BiCopy } from "react-icons/bi";
import { MdRestartAlt } from "react-icons/md";
import { checkIfUrl } from "#/lib/utils/url";
import { TbQrcode } from "react-icons/tb";
import { Toaster, toast } from "sonner";
import { uuid } from "#/lib/math";
import Link from "next/link";
import clsx from "clsx";

export const Home = (): ReactElement => {
  const supabase = createClientComponentClient<Database>();

  const [isPremium, setPremium] = useState<boolean>(false);
  const [premiumSettingsOpen, setPremiumSettingsOpen] = useState<boolean>(false);
  const [shortUrlChars, setShortUrlChars] = useState<number>(4);
  const [link, setLink] = useState<string>("");
  const [shortLink, setShortLink] = useState<string>("");
  const [littleHistory, setLittleHistory] = useState<string[]>([]);
  const [_, copy] = useCopyToClipboard();

  const generateShortLink = () : string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < ((shortUrlChars < 4 ? 4 : shortUrlChars) || (shortUrlChars > 100 ? 100 : shortUrlChars)); i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setLittleHistory([...littleHistory, result]);
    setShortLink(result);
    return result;
  };

  const handleLink = async() : Promise<boolean> => {
    const { error } = await supabase.from("Link").insert({
      url: link,
      slug: generateShortLink(),
      id: uuid()
    });

    if (error) {
      toast.error("An error has occurred while generating the link");
      return false;
    }

    toast.success("Link generated successfully");
    return true;
  };

  return (
    <PremiumContext.Provider value={{ isPremium, setPremium }}>
      <Toaster position="top-right" toastOptions={{
        style: {
          backgroundColor: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563"
        }
      }} />

      <Card>
        <div className="p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Shorten your links</h1>
          <Text>Generate your short link with a single click and share it with your friends, customers, or social media.</Text>

          <div className="flex flex-col mt-2">
            <div className="flex relative gap-2">
              <Input
                id="url"
                type="text"
                name="url"
                autoFocus={true}
                placeholder="Paste your link here"
                className="w-full"
                onChange={(e) => setLink(e.target.value)}
                onPaste={(e) => setLink(e.currentTarget.value)}
              />

              {!isPremium && shortLink !== "" && (
                <Input
                  id="generated"
                  type="text"
                  name="generated"
                  placeholder="Generated link"
                  className="w-full"
                  text="linkfy.fr/"
                  disabled
                  value={shortLink}
                />
              )}

              {isPremium && (
                <div className={clsx(
                  "absolute right-0 top-0 h-full flex p-2 mr-1.5 items-center cursor-pointer",
                  "text-gray-400 hover:bg-opacity-10 transition-colors duration-200 ease-in-out",
                  "hover:animate-spin hover:text-gray-500"
                )}
                onClick={() => {
                  if (isPremium) {
                    premiumSettingsOpen
                      ? setPremiumSettingsOpen(false)
                      : setPremiumSettingsOpen(true);
                  }
                }}
                >
                  <BsFillGearFill className="h-4.5 w-4.5" />
                </div>
              )}
            </div>

            <div className={clsx({ "block gap-2": premiumSettingsOpen && isPremium, "hidden": !premiumSettingsOpen || !isPremium })}>
              <div className="flex gap-2 mt-2.5">
                <Input
                  id="shortUrl"
                  type="text"
                  name="shortUrl"
                  placeholder="your-custom-url"
                  className="w-full"
                  text="linkfy.fr/"
                  value={shortLink}
                  onInput={(e) => {
                    setShortLink(e.currentTarget.value = e.currentTarget.value.replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, ""));
                  }}
                />

                <Input
                  id="maxLength"
                  type="number"
                  name="maxLength"
                  placeholder="4"
                  value={shortUrlChars}
                  min={4}
                  max={100}
                  onChange={(e) => {
                    setShortUrlChars(parseInt(e.target.value));
                    generateShortLink();
                  }}
                />

                <Button onClick={() => generateShortLink()}>
                  <MdRestartAlt className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex gap-2 mt-2.5">
                <Input
                  id="password"
                  type="text"
                  name="password"
                  placeholder="Password (optional)"
                  className="w-full"
                />

                <Input
                  id="expire"
                  type="date"
                  name="expire"
                  placeholder="Expiration date (optional)"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-2.5">
              <Button
                fulled
                disabled={!checkIfUrl(link, littleHistory)}
                onClick={() => {
                  if (!littleHistory.includes(link)) {
                    void handleLink();
                  } else {
                    toast.error("You have already generated this link recently");
                  }
                }}
                icon={{ icon: <BiLink className="h-5 w-5" /> }}
              >
                {isPremium && premiumSettingsOpen && (<>Generate</>)}
                {!premiumSettingsOpen && (<>Shorten</>)}
              </Button>

              <Button disabled icon={{ icon: <TbQrcode className="h-5 w-5" /> }} />

              <Button
                disabled={shortLink === ""}
                onClick={() => {
                  copy(`linkfy.fr/${shortLink}`).then(() => {
                    toast.success("Copied to clipboard");
                  }).catch(() => {
                    toast.error("Failed to copy to clipboard");
                  });
                }}
                icon={{ icon: <BiCopy className="h-5 w-5" /> }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* TODO: Check if users has > 10 links and show this card (can be hidden by user) */}
      {!isPremium && (<PricingCard showFree={false} />)}

      <div className="mt-4">
        <Link href={"/history"} className="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
          <RiMotorbikeFill
            size={20}
            className="group-hover:-rotate-45 group-hover:translate-x-40 transition-transform duration-1000 ease-in-out"
          />
          Ride to the history
        </Link>
      </div>
    </PremiumContext.Provider>
  );
};

export default Home;