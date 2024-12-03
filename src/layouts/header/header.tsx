import { auth } from '@/auth';
import { HeaderContent } from './header-content';

export const Header = async () => {
  const session = await auth();

  return (
    <header className="w-full h-[74px] shadow-md shadow-gray-300">
      <HeaderContent session={session} />
    </header>
  );
};
