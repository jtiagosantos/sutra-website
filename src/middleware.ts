import { auth } from '@/auth';

export default auth((request) => {
  const isProtectedRoute = ['/jogar', '/pagamento/processando'].includes(
    request.nextUrl.pathname,
  );
  const isUserAutehnticated = !!request.auth;

  if (isProtectedRoute && !isUserAutehnticated) {
    const url = new URL('/', request.nextUrl.origin);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
