/* eslint-disable import/prefer-default-export */

import createClient from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/forgot-password/update`);
    }
  }

  // Redirect to the error page if there is an error during code exchange
  return NextResponse.redirect(`${origin}/login`);
}
