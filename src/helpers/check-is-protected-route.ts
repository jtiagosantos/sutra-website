export const checkIsProtectedRoute = (pathname: string) => {
  if (
    ['/quiz-personalizado', '/pagamento/processando', '/medalhas'].includes(pathname)
  ) {
    return true;
  }

  if (pathname.includes('/quiz/jogar')) return true;
}