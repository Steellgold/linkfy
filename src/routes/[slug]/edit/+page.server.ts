import { PUBLIC_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async({ params, locals })  => {
  const { slug } = params;

  if (!locals.session?.user) {
    throw redirect(303, "/sign-in");
  }

  if (!slug) {
    throw redirect(303, "/");
  }

  const linkData = await fetch(PUBLIC_URL + "api/link?slug=" + slug, { method: "GET" });
  if (linkData.status !== 200 || !linkData.ok) {
    throw redirect(303, "/");
  }

  const link = await linkData.json();

  if (link.userId !== locals.session?.user.id) {
    throw redirect(307, "/");
  }

  return {
    slugData: {
      slug: link.slug,
      url: link.url,
      status: link.status,
      userId: link.userId
    }
  };
}) satisfies PageServerLoad;