import { Table, TableBody, TableButtonCopy, TableDataCell, TableHead, TableHeadCell, TableRow } from "#/lib/components/molecules/table";
import { BiBarChartSquare, BiLinkExternal, BiTrash } from "react-icons/bi";
import { HiPencilAlt } from "react-icons/hi";
import type { Component } from "#/lib/utils/component";
import type { LinksTableProps } from "./links-table.type";
import { dayJS } from "#/lib/utils/day-js";
import Link from "next/link";

export const LinksTable: Component<LinksTableProps> = ({ links }) => {
  return (
    <>
      {links && links.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>
                URL
              </TableHeadCell>
              <TableHeadCell>
                Short URL
              </TableHeadCell>
              <TableHeadCell>
                Created Date
              </TableHeadCell>
              <TableHeadCell>
                Clicks
              </TableHeadCell>
              <TableHeadCell srOnly>
                Actions
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((item, index) => (
              <TableRow className="border-b bg-gray-800 border-gray-600" key={index}>
                <TableDataCell first>
                  {item.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").substring(0, 15)}...
                </TableDataCell>
                <TableDataCell className="px-6 py-4">
                  {item.slug.substring(0, 4)}{item.slug.length > 4 ? "..." : ""}
                </TableDataCell>
                <TableDataCell className="px-6 py-4">
                  {dayJS(item.createdAt).format("DD/MM/YYYY HH:mm")}
                </TableDataCell>
                <TableDataCell className="px-6 py-4">
                  {item.clicks}
                </TableDataCell>
                <TableDataCell className="px-6 py-4">
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

                    <TableButtonCopy valueToCopy={item.slug} />
                  </div>
                </TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};