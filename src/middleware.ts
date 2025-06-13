import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Check if the route is protected (api routes that need auth)
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isPublicRoute = [
    '/api/search',
    '/api/search-document',
    '/api/contact',
    '/api/contact-request',
  ].includes(request.nextUrl.pathname);

  // Allow public routes and auth routes
  if (!isApiRoute || isAuthRoute || isPublicRoute) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Please log in.' },
      { status: 401 }
    );
  }

  // Add user info to headers for route handlers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', token.sub as string);
  requestHeaders.set('x-user-role', (token as any).role || 'USER');
  requestHeaders.set('x-user-email', token.email as string);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/api/:path*'],
}; 