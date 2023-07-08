"use client";

import { useState, type ReactElement } from "react";
import { Card } from "#/lib/components/atoms/card";
import { Input } from "#/lib/components/atoms/input";
import { Button } from "#/lib/components/atoms/button";
import { BiLink, BiLinkExternal, BiCopy } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { RiMotorbikeFill } from "react-icons/ri";
import { Text } from "#/lib/components/atoms/text";
import clsx from "clsx";

const HomePage = (): ReactElement => {
  const isPremium = false;
  const [premiumSettingsOpen, setPremiumSettingsOpen] = useState(false);

  return (
    <>
      <Card>
        <div className="mb-2 p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Shorten your links</h1>
          <Text>Generate your short link with a single click and share it with your friends, customers, or social media.</Text>

          <div className="flex flex-col mt-2">
            <div className="flex relative gap-2">
              <Input
                type="text"
                name="url"
                autoFocus={true}
                placeholder="Paste your link here"
                disabled={false}
                className="w-full"
              />

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

            <div className={clsx(
              {
                "block gap-2": premiumSettingsOpen && isPremium,
                "hidden": !premiumSettingsOpen || !isPremium
              }
            )}>
              <div className="flex gap-2 mt-2.5">
                <Input
                  type="text"
                  name="shortUrl"
                  placeholder="your-custom-url"
                  disabled={false}
                  className="w-full"
                  text="linkfy.fr/"
                />

                <Input
                  type="text"
                  name="password"
                  placeholder="Password (optional)"
                  disabled={false}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2 mt-2.5">
                <Input
                  type="date"
                  name="expire"
                  placeholder="Expiration date (optional)"
                  disabled={false}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-2.5">
              <Button fulled>
                <BiLink className="h-5 w-5 mr-2" /> Shorten
              </Button>

              <Button disabled>
                <BiCopy className="h-5 w-5" />
              </Button>

              <Button disabled>
                <BiLinkExternal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-2">
        <a href="/history" className="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
          <RiMotorbikeFill
            size={20}
            className="group-hover:-rotate-45 group-hover:translate-x-40 transition-transform duration-1000 ease-in-out"
          />
          Ride to the history
        </a>
      </div>
    </>
  );
};

export default HomePage;