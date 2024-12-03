import { auth } from '@/auth';
import { checkIsProtectedRoute } from './helpers/check-is-protected-route';

export default auth((request) => {
  const isProtectedRoute = checkIsProtectedRoute(request.nextUrl.pathname);
  const isUserAuthenticated = !!request.auth;

  if (isProtectedRoute && !isUserAuthenticated) {
    const url = new URL('/', request.nextUrl.origin);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
