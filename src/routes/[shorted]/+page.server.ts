import { getLink, type ILink } from "$lib/utils/Prisma";
import { error as SvelteKitError, redirect, type LoadEvent } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: LoadEvent ) {
  const { shorted } = params;
  let link: ILink = await getLink(shorted as string);

  if (!link) throw SvelteKitError(404, {
    message: "Link not found",
    // @ts-ignore
    code: 404,
  });

  // throw redirect(301, link["baseUrl"]);
}