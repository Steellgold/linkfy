import { getLink, updateLink, type ILink } from "$lib/utils/Prisma";
import { error as SvelteKitError, redirect, type LoadEvent } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: LoadEvent ) {
  const { short } = params;
  const link: ILink = await getLink(short as string);

  if (!link) {
    throw SvelteKitError(404, {
      message: 'Not found',
      // @ts-ignore
      code: 404
    });
  }

  // @ts-ignore
  let linkId: number = parseInt(link.id);
  // @ts-ignore
  let clicksCount: number = parseInt(link.clicksCount);

  await updateLink(linkId, {
    clicksCount: clicksCount + 1,
  });

  if (link.baseUrl) {
    throw redirect(301, link.baseUrl);
  } else {
    throw SvelteKitError(404, {
      message: 'Not found',
      // @ts-ignore
      code: 404
    });
  }
}