'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CircleUserRound, Gamepad2, House, LibraryBig } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';
import LogoImage from '@/assets/logo.svg';
import LogoSmImage from '@/assets/logo-sm.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Input } from '@/components/ui/input';
import { DrawerMenu } from './drawer-menu';
import { Session } from 'next-auth';
import { User } from './user';

type HeaderContentProps = {
  session: Session | null;
}

export const HeaderContent: FC<HeaderContentProps> = ({ session }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="max-w-[1464px] w-full h-full mx-auto px-3 flex items-center justify-between">
      <div className="w-full flex items-center gap-8 max-[1000px]:gap-5 max-[600px]:gap-2">
        <DrawerMenu session={session} />

        <Link href="/" className="max-[600px]:hidden relative">
          <LogoImage />
          <h1 className="absolute text-transparent">Sutra</h1>
        </Link>
        <Link href="/" className="hidden max-[600px]:block relative">
          <LogoSmImage />
          <h1 className="absolute text-transparent">Sutra</h1>
        </Link>

        <Link href="/" className={clsx('font-body font-semibold text-base flex items-center gap-1 max-[1000px]:hidden', {
          'text-davysGray': pathname === '/',
          'text-dimGray opacity-70': pathname !== '/',
        })}>
          <House size={22} />
          Início
        </Link>

        <Link href="/explorar" className={clsx('font-body font-semibold text-base text-davysGray flex items-center gap-1 max-[1000px]:hidden', {
          'text-davysGray': pathname.startsWith('/explorar'),
          'text-dimGray opacity-70': !pathname.startsWith('/explorar'),
        })}>
          <LibraryBig size={22} />
          Explorar
        </Link>

        <form className="max-w-[500px] w-full ml-8 max-[1250px]:max-w-[300px] max-[1024px]:ml-0 max-[1000px]:hidden">
          <Input
            type="text"
            name="busca"
            placeholder='Pesquise no Sutra'
            className="w-full bg-[#ebeaea] border-[#ebeaea] h-[45.2px] rounded-xl text-slateGray placeholder:text-slateGray"
            autoComplete="off"
          />
        </form>
      </div>

      <div className={clsx('flex items-center justify-end', {
        'gap-2': !session,
        'gap-4': !!session,
      })}>
        {!session && (
          <>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="text-white text-base bg-tropicalIndigo px-4 py-[9px] font-body border-[2px] border-tropicalIndigo tracking-wider hover:border-tropicalIndigo hover:bg-white hover:text-tropicalIndigo flex flex-row items-center gap-2 rounded-xl transition-all duration-300 max-[600px]:text-sm">
              <Gamepad2 size={24} className="max-[600px]:hidden" />
              Jogar Quiz
            </Button>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="text-tropicalIndigo text-base px-4 py-[9px] font-body bg-transparent border-[2px] border-tropicalIndigo tracking-wider hover:border-white hover:bg-tropicalIndigo hover:text-white flex flex-row items-center gap-2 rounded-xl transition-all duration-300 max-[600px]:text-sm">
              <CircleUserRound size={24} className="max-[600px]:hidden" />
              Entrar
            </Button>
            <AuthModal open={open} onOpenChange={setOpen} />
          </>
        )}
        {!!session && (
          <>
            <Link href="/quiz-personalizado">
              <Button
                variant="outline"
                className="text-white text-base bg-tropicalIndigo px-4 py-[9px] font-body border-[2px] border-tropicalIndigo tracking-wider hover:border-tropicalIndigo hover:bg-white hover:text-tropicalIndigo flex flex-row items-center gap-2 rounded-xl transition-all duration-300 max-[600px]:text-sm">
                <Gamepad2 size={24} className="max-[600px]:hidden" />
                Jogar Quiz
              </Button>
            </Link>
            <User />
          </>
        )}
      </div>
    </div>
  );
};
