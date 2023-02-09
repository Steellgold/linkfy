import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import type { Session } from "@supabase/supabase-js";

interface User {
  email: string;
  isPremium: boolean;
  role: "user" | "admin";
}

declare global {
  declare namespace App {
    interface Error {
      code: number;
    }
    interface Locals {
      sb: TypedSupabaseClient;
      session: Session | null;
      user: User | null;
    }
    interface PageData {
      session: import("@supabase/supabase-js").Session | null;
      user: User | null;
    }
    // interface Platform {}
  }
}