import { getLinks } from '$lib/utils/db/Supabase';
import { error as SvelteKitError } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  let links = await getLinks("visitorId", "TaQqIrJWmmGaTCNnQpdm");

  if (!links) {
    throw SvelteKitError(404, {
      message: 'Not found',
      // @ts-ignore
      code: 404
    });
  }

  return {
    links
  }
}