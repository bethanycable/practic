import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

import type { Database } from "$lib/supabase-types";
import type { LayoutLoad } from "./$types";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";

export const load: LayoutLoad = async ({fetch, data, depends}) => {
  depends("supabase:auth")
  
  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch},
    serverSession: data.session,
  })

  const { data: { session } } = await supabase.auth.getSession()

  return {
    supabase,
    session,
  }
};
