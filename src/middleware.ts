import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  // Public routes that do not require authentication
  const publicRoutes = ['/', '/invoices'];

  // If the user is authenticated (has a token) and tries to access /login, redirect to /admin
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url)); // Redirect to /admin
  }

  // Check if the request URL matches a public route
  if (publicRoutes.includes(request.nextUrl.pathname) ||
      request.nextUrl.pathname.startsWith('/invoices/')) {
    return NextResponse.next(); // Allow access to public routes
  }

  // Check if user is accessing /admin but doesn't have a token (not authenticated)
  if (request.nextUrl.pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect to /login
  }

  return NextResponse.next(); // Allow access if authenticated
}

export const config = {
  matcher: ['/admin', '/', '/login', '/invoices/:path*'], // Apply middleware to these routes
}
