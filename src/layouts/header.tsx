'use client';

import { Button } from '@/components/ui/button';
import { CircleUserRound } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';
import { useState } from 'react';

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="max-w-[1240px] w-full mx-auto border-b border-gray-200 p-2 mt-2">
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="text-[#8381D9] text-base px-4 py-[10px] font-body bg-transparent border-[2px] border-[#8381D9] tracking-wider hover:border-white hover:bg-[#8381D9] hover:text-white flex flex-row items-center gap-2 rounded-xl transition-all duration-300">
        <CircleUserRound size={20} />
        Entrar
      </Button>
      <AuthModal open={open} onOpenChange={setOpen} />
    </header>
  );
};
