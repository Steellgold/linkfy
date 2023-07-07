import { Card } from "#/lib/components/atoms/card";
import { Input } from "#/lib/components/atoms/input";
import { Button } from "#/lib/components/atoms/button";
import { BiLink, BiLinkExternal, BiCopy, BiHistory } from "react-icons/bi";
import { Text } from "#/lib/components/atoms/text";
import type { ReactElement } from "react";

const HomePage = (): ReactElement => {
  return (
    <>
      <Card>
        <div className="mb-2 p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Shorten your links</h1>
          <Text>
            Generate your short link with a single click and share it with your friends, customers, or social media.
          </Text>

          <div className="flex flex-col mt-2">
            <Input
              type="text"
              name="url"
              autoFocus={true}
              placeholder="Paste your link here"
              disabled={false}
              className="w-full"
            />

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

              <Button disabled>
                <BiHistory className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default HomePage;