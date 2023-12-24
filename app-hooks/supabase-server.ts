import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/config";
import { Database } from "@/lib/database.types";
import {
  createServerClient,
  type CookieOptions,
  createBrowserClient,
} from "@supabase/ssr";
import { cookies } from "next/headers";

export const useSupabaseForServerComponents = () => {
  const cookieStore = cookies();
  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
};

export const useSupabaseForRouteHandlers = () => {
  const cookieStore = cookies();
  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });
};
