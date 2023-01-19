import { getLink } from '$lib/utils/db/Supabase';
import { error as SvelteKitError, redirect, type LoadEvent } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: LoadEvent ) {
  const { short } = params;
  let link = await getLink(short as string);

  if (!link) {
    throw SvelteKitError(404, {
      message: 'Not found',
      // @ts-ignore
      code: 404
    });
  }

  return {
    link
  }
}