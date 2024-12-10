import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register", "/forgot-password/email"];

export function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.startsWith(route));
}

const publicRoutes = ["/contact"];

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname.startsWith(route));
}

export function protectRoutes(
  request: NextRequest,
  user: User | null,
): NextResponse | null {
  // If the user is not logged in and tries to access a protected route, redirect them to the login page
  if (
    !user &&
    !isAuthRoute(request.nextUrl.pathname) &&
    !isPublicRoute(request.nextUrl.pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If the user is logged in and tries to access an auth route, redirect them to the home page
  if (user && isAuthRoute(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return null;
}
