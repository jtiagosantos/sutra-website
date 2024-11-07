import { auth } from '@/auth';
import { UnauthenticatedPage } from './unauthenticated-page';
import { AuthenticatedPage } from './authenticated-page';
import { BackButton } from '@/components/back-button';
import { Header } from '@/layouts/header/header';

export default async function Page() {
  const session = await auth();

  return (
    <>
      <Header />
      <main className="max-w-[1464px] w-full mx-auto mt-6 mb-10 px-3">
        {!session && <UnauthenticatedPage />}
        {!!session && <AuthenticatedPage session={session} />}
        <BackButton />
      </main>
    </>
  );
}
