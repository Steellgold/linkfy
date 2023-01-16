import { connected } from "$lib/utils/Stores";
import { error as SvelteKitError } from '@sveltejs/kit';

export const load = (() => {
  if (!connected) {
    throw SvelteKitError(401, {
      message: 'Unauthorized',
      // @ts-ignore
      code: 401,
    });
  }
});