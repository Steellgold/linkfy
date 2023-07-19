import { TbAbc, TbCalendarTime, TbChartPie, TbClick, TbHeadset, TbLanguage, TbLock, TbQrcode, TbSignature } from "react-icons/tb";
import type { ListProps } from "#/lib/components/molecules/list/list.type";
import { Button } from "#/lib/components/atoms/button";
import { List } from "#/lib/components/molecules/list";
import type { Component } from "#/lib/utils/component";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";
import { BiRocket } from "react-icons/bi";
import type { ReactElement } from "react";

export const PricingCard: Component<{ maxFeatures?: number }> = ({ maxFeatures }): ReactElement => {

  const list: ListProps = ({
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
      }
    ]
  });

  if (maxFeatures) {
    const newList = list.items.slice(0, maxFeatures);
    list.items = newList;
  }

  return (
    <>
      <Card variant="premium" className="mt-4">
        <div className="grid grid-cols-2 gap-2 items-center">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Linkfy <span className="pro">Plus</span></h1>
          <Text className="text-gray-400 text-right">
            <span className="pro">4.99$</span>/month
          </Text>
        </div>
        <Text>Upgrade your account to access premium features</Text>

        <List className="mt-2" {...list} />

        <div className="flex flex-col mt-2">
          <Button fulled variant="pro" className="mt-2" icon={{
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
    </>
  );
};