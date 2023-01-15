import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "$env/static/private";

const supabase = createClient(supabaseUrl, supabaseKey)
export const db = supabase;

export function insertLink(link: string, shorted: string) {
  return supabase.from('links').insert({ link, shorted });
}
