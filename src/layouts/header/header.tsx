import { auth } from '@/auth';
import { UnauthenticatedHeader } from './unauthenticated-header';
import { AuthenticatedHeader } from './authenticated-header';

export const Header = async () => {
  const session = await auth();

  return (
    <header className="max-w-[1240px] w-full mx-auto border-b border-gray-300 p-2 mt-2 flex gap-4 items-center justify-between">
      {!session ? <UnauthenticatedHeader /> : <AuthenticatedHeader />}
    </header>
  );
};
