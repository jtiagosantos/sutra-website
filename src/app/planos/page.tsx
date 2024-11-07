import LogoImage from '@/assets/logo.svg';
import { auth } from '@/auth';
import { UnauthenticatedPage } from './unauthenticated-page';
import { AuthenticatedPage } from './authenticated-page';
import { BackButton } from '@/components/back-button';

export default async function Page() {
  const session = await auth();

  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      <LogoImage />

      {!session && <UnauthenticatedPage />}
      {!!session && <AuthenticatedPage session={session} />}

      <BackButton />
    </main>
  );
}
