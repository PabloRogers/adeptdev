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
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // Redirect to the home page in development environment
        return NextResponse.redirect(`${origin}/`);
      }
      if (forwardedHost) {
        // Redirect to the home page in production environment with load balancer
        return NextResponse.redirect(`https://${forwardedHost}/`);
      }
      // Redirect to the home page in production environment without load balancer
      return NextResponse.redirect(`${origin}/`);
    }
  }

  // Redirect to the error page if there is an error during code exchange
  return NextResponse.redirect(`${origin}/login?error=true`);
}
