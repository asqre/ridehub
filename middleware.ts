import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This middleware is kept for future authentication checks
  // NextAuth will handle the actual authentication
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/booking/:path*",
  ]
}

