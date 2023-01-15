import { db } from '$lib/utils/Supabase';
import { redirect, type LoadEvent } from '@sveltejs/kit';
import { error as SvelteKitError } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: LoadEvent ) {
  let shorted: string | undefined = params.shorted;

  let { data: links, error } = await db
    .from('links')
    .select('url')
    .eq('shorted', shorted);

  if (error) {
    throw SvelteKitError(500, {
      message: 'Internal Server Error',
      // @ts-ignore
      code: 500,
    });
  }

  if (!links || links.length === 0) {
    throw SvelteKitError(404, {
      message: 'Not found',
      // @ts-ignore
      code: 404,
    });
  }

  throw redirect(301, links[0].url);
}