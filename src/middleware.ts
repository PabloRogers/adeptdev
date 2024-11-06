import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAuthRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/forgotpassword(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (!userId && !isAuthRoute(req)) {
    const signInUrl = new URL("/login", req.url);
    return NextResponse.redirect(signInUrl);
  }
  if (userId && isAuthRoute(req)) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
