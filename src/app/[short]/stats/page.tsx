import { BsBrowserChrome, BsBrowserEdge, BsBrowserFirefox, BsBrowserSafari, BsWindows, BsApple } from "react-icons/bs";
import { StatsCard, StatsCardRow } from "./_components/stats-card";
import { Select } from "#/lib/components/atoms/select";
import { Text } from "#/lib/components/atoms/text";
import { BiLogoOpera } from "react-icons/bi";
import type { IconType } from "react-icons";
import { BsAndroid } from "react-icons/bs";
import type { ReactElement } from "react";
import { DiLinux } from "react-icons/di";

type Browsers = {
  browser: "Chrome" | "Firefox" | "Edge" | "Safari" | "Opera" | "Other";
  title: string;
  icon: ReactElement<IconType> | null;
};

type OperatingSystems = {
  os: "Windows" | "Android" | "Linux" | "iOS" | "MacOS" | "Other";
  title: string;
  icon: ReactElement<IconType> | null;
};

const StatsPage = (): ReactElement => {

  const browsers: Browsers[] = [
    { browser: "Chrome", icon: <BsBrowserChrome />, title: "Chrome" },
    { browser: "Firefox", icon: <BsBrowserFirefox />, title: "Firefox" },
    { browser: "Edge", icon: <BsBrowserEdge />, title: "Edge" },
    { browser: "Safari", icon: <BsBrowserSafari />, title: "Safari" },
    { browser: "Opera", icon: <BiLogoOpera />, title: "Opera" },
    { browser: "Other", icon: null, title: "Other" }
  ];

  const operatingSystems: OperatingSystems[] = [
    { os: "Windows", icon: <BsWindows />, title: "Windows" },
    { os: "Android", icon: <BsAndroid />, title: "Android" },
    { os: "Linux", icon: <DiLinux />, title: "Linux" },
    { os: "iOS", icon: <BsApple />, title: "iOS" },
    { os: "MacOS", icon: <BsApple />, title: "MacOS" },
    { os: "Other", icon: null, title: "Other" }
  ];

  type LinkItem = {
    url: string;
    shortUrl: string;
    createdDate: string;
    clicks: number;
    lastClick?: string;
    stats?: {
      countries: {
        country: string;
        clicks: number;
      }[];
      os: {
        os: string;
        clicks: number;
      }[];
      browsers: {
        browser: "Chrome" | "Firefox" | "Edge" | "Safari" | "Opera" | "Other";
        clicks: number;
      }[];
      referrers?: {
        referrer: string;
        clicks: number;
      }[];
    };
  };

  const link: LinkItem = {
    url: "https://google.com",
    shortUrl: "az45",
    createdDate: "2021-07-17 20:00:00",
    clicks: 56,
    stats: {
      countries: [
        { country: "France", clicks: 12 },
        { country: "United States", clicks: 5 },
        { country: "Germany", clicks: 3 },
        { country: "United Kingdom", clicks: 2 },
        { country: "Canada", clicks: 1 }
      ],
      os: [
        { os: "Windows", clicks: 39 },
        { os: "Android", clicks: 12 },
        { os: "Linux", clicks: 3 },
        { os: "iOS", clicks: 2 },
        { os: "MacOS", clicks: 2 }
      ],
      browsers: [
        { browser: "Chrome", clicks: 20 },
        { browser: "Firefox", clicks: 4 },
        { browser: "Edge", clicks: 3 },
        { browser: "Safari", clicks: 2 },
        { browser: "Opera", clicks: 1 },
        { browser: "Other", clicks: 1 }
      ],
      referrers: [
        { referrer: "Direct Link", clicks: 32 },
        { referrer: "Google", clicks: 19 },
        { referrer: "Twitter", clicks: 3 },
        { referrer: "Facebook", clicks: 2 }
      ]
    }
  };

  return (
    <div className="mx-auto max-w-screen-md items-center justify-center px-4">
      <nav className="bg-transparent flex justify-end items-center mb-2 mx-auto">
        <Select options={[
          { value: "all", label: "All time" },
          { value: "day", label: "Last day" },
          { value: "week", label: "Last week" },
          { value: "month", label: "Last month" },
          { value: "year", label: "Last year" }
        ]} />
      </nav>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 whitespace-nowrap">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-md">
          <Text className="font-bold text-2xl">25k</Text>
          <Text className="text-gray-500">Total clicks</Text>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-md">
          <Text className="font-bold text-2xl">France</Text>
          <Text className="text-gray-500">Top country</Text>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-md">
          <Text className="font-bold text-2xl">{link.stats?.browsers[0].browser}</Text>
          <Text className="text-gray-500">Top browser</Text>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <StatsCard title="Operating Systems" description="The top operating systems of your link has been clicked.">
          {link.stats?.os?.map(({ os, clicks }) => (
            <StatsCardRow
              key={os}
              title={os}
              stats={{ count: clicks, max: link.clicks }}
              icon={operatingSystems.find(o => o.os === os)?.icon}
            />
          ))}
        </StatsCard>

        <StatsCard title="Browsers" description="The top browsers of your link has been clicked.">
          {link.stats?.browsers?.map(({ browser, clicks }) => (
            <StatsCardRow
              key={browser}
              title={browser}
              stats={{ count: clicks, max: link.clicks }}
              icon={browsers.find(b => b.browser === browser)?.icon}
            />
          ))}
        </StatsCard>

        <StatsCard title="Referrers" description="The top referrers of your link has been clicked.">
          {link.stats?.referrers?.map(({ referrer, clicks }) => (
            <StatsCardRow
              key={referrer}
              title={referrer}
              stats={{ count: clicks, max: link.clicks }}
              icon={null}
            />
          ))}
        </StatsCard>

        <StatsCard title="Countries" description="The top countries of your link has been clicked.">
          {link.stats?.countries?.map(({ country, clicks }) => (
            <StatsCardRow
              key={country}
              title={country}
              stats={{ count: clicks, max: link.clicks }}
              icon={null}
            />
          ))}
        </StatsCard>
      </div>
    </div>
  );
};


{ /* style={{ maxWidth: "calc(100%)", width: percentageToWidth(percentage(link.clicks, clicks)) }} */ }
export default StatsPage;