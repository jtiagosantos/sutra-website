'use client';

import { useState } from 'react';
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

export const UnauthenticatedHeader = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="max-w-[1440px] w-full h-full mx-auto flex items-center justify-between max-[1470px]:px-2">
      <div className="w-full flex items-center gap-8 max-[1000px]:gap-5 max-[600px]:gap-2">
        <DrawerMenu />

        <Link href="/" className="max-[600px]:hidden">
          <LogoImage />
        </Link>
        <Link href="/" className="hidden max-[600px]:block">
          <LogoSmImage />
        </Link>

        <Link href="/" className={clsx('font-body font-semibold text-base flex items-center gap-1 max-[1000px]:hidden', {
          'text-davysGray': pathname === '/',
          'text-dimGray opacity-70': pathname !== '/',
        })}>
          <House size={22} />
          Início
        </Link>

        <Link href="/" className={clsx('font-body font-semibold text-base text-davysGray flex items-center gap-1 max-[1000px]:hidden', {
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
            className="w-full bg-antiFlashWhite border-antiFlashWhite h-[45.2px] rounded-xl text-slateGray placeholder:text-slateGray"
            autoComplete="off"
          />
        </form>
      </div>

      <div className="flex items-center justify-end gap-2">
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
      </div>

      <AuthModal open={open} onOpenChange={setOpen} />
    </div>
  );
};
