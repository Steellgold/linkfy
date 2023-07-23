import type { LinkSchema } from "#/lib/utils/api/schema.user";

export type LinksTableProps = {
  links: LinkSchema[] | null;
  emptyMessage?: string;
};