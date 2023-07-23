"use client";

import { BiBarChartSquare, BiCopy, BiLinkExternal, BiTrash } from "react-icons/bi";
import type { HistoryLinkSchema, HistoryLinksResponseSchema } from "#/lib/utils/api/schema.user";
import { useState, type ReactElement, useEffect } from "react";
import { useCopyToClipboard, useFetch } from "usehooks-ts";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Text } from "#/lib/components/atoms/text";
import { Card } from "#/lib/components/atoms/card";
import { HiPencilAlt } from "react-icons/hi";
import { dayJS } from "#/lib/utils/day-js";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import clsx from "clsx";

const HistoryPage = (): ReactElement => {
  const [value, copy] = useCopyToClipboard();

  const { data, error } = useFetch<HistoryLinksResponseSchema>("/api/user/history");
  const [links, setLinks] = useState<HistoryLinkSchema[]>([]);

  useEffect(() => {
    if (data) {
      setLinks(data.links);
    }
  }, [data]);

  return (
    <>
      <Toaster position="top-right" expand toastOptions={{
        style: {
          backgroundColor: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563"
        }
      }} />

      <Card size={data?.userId && links.length > 0 && !error ? "xl" : "sm"} className="bg-gray-800">
        <div className={clsx("p-0", { "mb-2": links.length > 0 })}>
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">History</h1>
          {!error && (
            <>
              {data?.userId && (
                <>
                  {links.length > 0 ? (
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
          ) || (
            <Text>
              An error occurred while trying to fetch your history, please try again later.
            </Text>
          )}
        </div>

        {links.length > 0 && (
          <div className="flex flex-col mt-2">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      URL
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Short URL
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Clicks
                    </th>
                    <th scope="col" className="px-6 py-3 sr-only">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((item, index) => (
                    <tr key={index} className="border-b bg-gray-800 border-gray-600">
                      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {item.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").substring(0, 10)}...
                      </td>
                      <td className="px-6 py-4">
                        {item.slug.substring(0, 4)}{item.slug.length > 4 ? "..." : ""}
                      </td>
                      <td className="px-6 py-4">
                        {dayJS(item.createdAt).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className="px-6 py-4">
                        {item.clicks}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 text-gray-400">
                          <Link href={item.url}>
                            <BiLinkExternal className="h-5 w-5 hover:text-white transition-colors duration-200" />
                          </Link>
                          <Link href={`/${item.slug}/stats`}>
                            <BiBarChartSquare className="h-5 w-5 hover:text-white transition-colors duration-200" />
                          </Link>
                          <BiTrash className="h-5 w-5 hover:text-white transition-colors duration-200" />
                          <Link href={`/${item.slug}/edit`}>
                            <HiPencilAlt className="h-5 w-5 hover:text-white transition-colors duration-200" />
                          </Link>
                          <BiCopy
                            className="h-5 w-5 hover:text-white transition-colors duration-200"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={async() => {
                              await copy(item.slug);
                              if (value) {
                                toast("Copied to clipboard!", {
                                  icon: <BsFillCheckCircleFill />
                                });
                              }
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export default HistoryPage;