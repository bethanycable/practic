import type { Database } from "$lib/supabase-types";
import { ENV } from "./env";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient<Database>(ENV.PUBLIC_SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY);
