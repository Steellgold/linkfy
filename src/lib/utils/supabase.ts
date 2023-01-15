import { supabaseUrl, supabaseKey } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(supabaseUrl, supabaseKey)

export const db = supabase;
