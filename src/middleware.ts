import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname, search } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin-login") {
    if (!token) {
      const loginUrl = new URL("/admin-login", request.url);
      loginUrl.searchParams.set("return_to", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /dashboard and its sub-routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("return_to", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users trying to access login/register
  if (pathname === "/login" || pathname === "/register" || pathname === "/admin-login") {
    if (token) {
      // Very basic fallback: if trying to access a login page while logged in, 
      // go to dashboard. Server-side checks will bounce them later if needed.
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};
