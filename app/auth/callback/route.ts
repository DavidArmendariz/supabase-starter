import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { useSupabaseForRouteHandlers } from "@/app-hooks/supabase-server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const supabase = useSupabaseForRouteHandlers();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
