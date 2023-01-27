declare global {
  namespace App {
    interface Error {
      code: number;
    }

    interface Locals {
      sb: TypedSupabaseClient
      session: Session | null
    }

    interface PageData {
      session: import("@supabase/supabase-js").Session | null
    }
  }
}

export {};