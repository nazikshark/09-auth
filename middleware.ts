import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session-id'); 
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!session && !isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/notes', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};