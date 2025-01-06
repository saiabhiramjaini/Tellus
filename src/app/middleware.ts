// import { getToken } from "next-auth/jwt"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request })
  
//   if (!token) {
//     return NextResponse.redirect(new URL("/api/auth/signin", request.url))
//   }
  
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/feedback/:path*"]
// }






// src/middleware.ts
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api/testimonials/')) {
    // For OPTIONS request, return CORS headers only
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // For actual requests, add CORS headers to the response
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  // Handle authentication for protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/feedback')) {
    const token = await getToken({ req: request })
    
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/feedback/:path*',
    '/api/testimonials/:path*'
  ]
}