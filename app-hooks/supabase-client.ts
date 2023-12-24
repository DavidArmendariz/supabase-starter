import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/config";
import { Database } from "@/lib/database.types";
import { createBrowserClient } from "@supabase/ssr";

export const useSupabaseForClientComponents = () => {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
};
