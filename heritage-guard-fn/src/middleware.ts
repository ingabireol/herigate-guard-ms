// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/about',
  '/contact',
  '/heritage',
];

// Paths that require admin role
const adminPaths = [
  '/admin',
  '/admin/users',
  '/admin/heritage',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  // If path requires authentication and user is not authenticated
  if (!isPublicPath && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('returnUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }
  
  // For paths requiring specific roles, we'll rely on client-side checks
  // since we can't easily decode the JWT on the edge
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next/|api/|static/|.*\\..*|favicon.ico).*)',
  ],
};