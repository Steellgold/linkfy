import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import type { Session } from "@supabase/supabase-js";

declare global {
  declare namespace App {
    interface Error {
      code: number;
    }
    interface Locals {
      sb: TypedSupabaseClient;
      session: Session | null;
    }
    interface PageData {
      session: import("@supabase/supabase-js").Session | null;
    }
    // interface Platform {}
  }
}
