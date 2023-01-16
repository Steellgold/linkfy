import { createClient } from "@supabase/supabase-js";
import { SECRET_SUPABASE_URL, SECRET_SUPABASE_KEY } from "$env/static/private";

const supabase = createClient(SECRET_SUPABASE_URL, SECRET_SUPABASE_KEY)
export const db = supabase;

export function insertLink(link: string, shorted: string) {
  return supabase.from('links').insert({ link, shorted });
}
