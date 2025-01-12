import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Read token from cookies
  const token1 = request.cookies.get("authjs.session-token"); // Read token from cookies
  const isToken = token || token1;
  if (!token1) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if not logged in
  }

  return NextResponse.next(); // Allow access if token exists
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Apply middleware to specific routes
};
