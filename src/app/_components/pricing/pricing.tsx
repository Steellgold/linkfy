import { TbAbc, TbApi, TbCalendarTime, TbChartArcs, TbChartPie, TbClick, TbHeadset, TbLanguage, TbLock, TbQrcode, TbSignature, TbUser } from "react-icons/tb";
import type { ListProps } from "#/lib/components/molecules/list/list.type";
import { Button } from "#/lib/components/atoms/button";
import { List } from "#/lib/components/molecules/list";
import type { Component } from "#/lib/utils/component";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";
import { BiRocket } from "react-icons/bi";
import clsx from "clsx";
import { LinkButton } from "#/lib/components/atoms/link-button";

export const PricingCard: Component<{ showFree: boolean }> = ({ showFree }) => {

  const premiumList: ListProps = ({
    items: [
      {
        name: "Have your own subdomain*",
        icon: <TbSignature className="h-5 w-5" />
      }, {
        name: "Customize your link",
        icon: <TbAbc className="h-5 w-5" />
      }, {
        name: "Password protection",
        icon: <TbLock className="h-5 w-5" />
      }, {
        name: "Customize your QR code",
        icon: <TbQrcode className="h-5 w-5" />
      }, {
        name: "Expiration date",
        icon: <TbCalendarTime className="h-5 w-5" />
      }, {
        name: "Analytics",
        icon: <TbChartPie className="h-5 w-5" />
      }, {
        name: "Priority support",
        icon: <TbHeadset className="h-5 w-5" />
      }, {
        name: "Target country",
        icon: <TbLanguage className="h-5 w-5" />
      }, {
        name: "Limit the number of clicks",
        icon: <TbClick className="h-5 w-5" />
      }, {
        name: "Unlimited links per day with API",
        icon: <TbApi className="h-5 w-5" />
      }
    ]
  });

  const list: ListProps = ({
    items: [
      {
        name: "Have your own subdomain*",
        icon: <TbSignature className="h-5 w-5" />
      }, {
        name: "Generate QR code",
        icon: <TbQrcode className="h-5 w-5" />
      }, {
        name: "Basic Analytics",
        icon: <TbChartArcs className="h-5 w-5" />
      }, {
        name: "200 links per day with API",
        icon: <TbApi className="h-5 w-5" />
      }
    ]
  });

  return (
    <>
      <div className={clsx({
        "grid grid-cols-1 md:grid-cols-2 mx-auto w-full max-w-4xl gap-4": showFree
      })}>
        {showFree && (
          <Card variant="free" className="mt-4">
            <div className="grid grid-cols-2 gap-2 items-center">
              <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Linkfy <span className="free">Free</span></h1>
              <Text className="text-gray-400 text-right">
                <span className="free">0$</span>/month
              </Text>
            </div>
            <Text>Free account with basic features</Text>

            <List className="mt-2" {...list} />

            <div className="flex flex-col mt-2">
              <LinkButton href={"/sign-up"} fulled variant="free" className="mt-2">
                Create account
              </LinkButton>
            </div>

            <div className="flex flex-col mt-2">
              <Text className="text-gray-400 text-xs">
              * Free account does not offer you a custom subdomain, you can buy your own subdomain for 2.99$
              </Text>
            </div>
          </Card>
        )}

        <Card variant="premium" className="mt-4">
          <div className="grid grid-cols-2 gap-2 items-center">
            <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Linkfy <span className="pro">Plus</span></h1>
            <Text className="text-gray-400 text-right">
              <span className="pro">4.99$</span>/month
            </Text>
          </div>
          <Text>Upgrade your account to access premium features</Text>

          <List className="mt-2" {...premiumList} />

          <div className="flex flex-wrap mt-2">
            <Button fulled variant="premium" className="mt-2" icon={{
              icon: <BiRocket className="h-5 w-5" />,
              position: "left"
            }}>
              Upgrade
            </Button>
          </div>

          <div className="flex flex-col mt-2">
            <Text className="text-gray-400 text-xs">* The first subdomain is free, then it will be 1.99$ per subdomain</Text>
            <Text className="text-gray-400 text-xs">
              Payment secured by <span className="text-stripe">Stripe</span> and you can cancel your subscription at any time
            </Text>
          </div>
        </Card>
      </div>
    </>
  );
};