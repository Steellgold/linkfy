import { db } from '$lib/utils/supabase';
import { redirect, type LoadEvent } from '@sveltejs/kit';
import { error as SvelteKitError } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: LoadEvent ) {
  let shorted: string | undefined = params.shorted;
  let url: string | undefined;

  let { data: links, error } = await db
  .from('links')
  .select('url')
  .eq('shorted', shorted);

  if (!links || links.length === 0) {
    throw SvelteKitError(404, {
      message: 'Not found',
      // @ts-ignore
      code: 404,
    });
  }

  console.log(links[0].url);
  throw redirect(301, links[0].url);
}