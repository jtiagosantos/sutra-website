import LogoImage from '@/assets/logo.svg';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';
import { UnauthenticatedPage } from './unauthenticated-page';
import { AuthenticatedPage } from './authenticated-page';

export default async function Page() {
  const session = await auth();

  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      <LogoImage />

      {!session && <UnauthenticatedPage />}
      {!!session && <AuthenticatedPage session={session} />}

      <Link
        href="/"
        className="mt-10 text-[#8381D9] w-fit flex items-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
        prefetch={false}>
        <MoveLeft className="w-5 h-5 pt-[3px]" />
        voltar
      </Link>
    </main>
  );
}
