import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); 
  const token1 = request.cookies.get("authjs.session-token"); 
  const isToken = token || token1;
  if (!isToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url)); 
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/customize/:path*",
    "/test/:path*",
    "/templates/:path*",
    // "/api/:path*",
  ], 
};
