import { createClient } from "@supabase/supabase-js";
import { SECRET_SUPABASE_URL, SECRET_SUPABASE_KEY } from "$env/static/private";

const supabase = createClient(SECRET_SUPABASE_URL, SECRET_SUPABASE_KEY)
export const db = supabase;

export async function getLinks(type: "visitorId" | "userId", id: string) : Promise<any> {
  const { data: links, error } = await db
    .from('links')
    .select('*')
    .eq(type, id);

  if (error) return error;
  return links;
}

export async function getLink(shortUrl: string) : Promise<any> {
  const { data: links, error } = await db
    .from('links')
    .select('*')
    .eq('shortUrl', shortUrl);

  if (error) return error;
  return links[0];
}

export async function createLink(data: any) : Promise<any> {
  const { data: link, error } = await db
    .from('links')
    .insert(data as any);

  if (error) return error;
  return link;
}

export async function updateLink(shortUrl: string, data: any) : Promise<any> {
  const { data: link, error } = await db
    .from('links')
    .update(data)
    .eq('shortUrl', shortUrl);

  if (error) return error;
  return link;
}

export async function deleteLink(shortUrl: string) : Promise<any> {
  const { data: link, error } = await db
    .from('links')
    .delete()
    .eq('shortUrl', shortUrl);

  if (error) return error;
  return link;
}