'use client';

import { Button } from '@/components/ui/button';
import { CircleUserRound, LogOut, Zap } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';
import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="max-w-[1240px] w-full mx-auto border-b border-gray-300 p-2 mt-2 flex gap-4 items-center justify-between">
      {/* UNAUTHENTICATED */}
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="text-[#8381D9] text-base px-4 py-[10px] font-body bg-transparent border-[2px] border-[#8381D9] tracking-wider hover:border-white hover:bg-[#8381D9] hover:text-white flex flex-row items-center gap-2 rounded-xl transition-all duration-300">
        <CircleUserRound size={20} />
        Entrar
      </Button>
      <AuthModal open={open} onOpenChange={setOpen} />

      {/* AUTHENTICATED */}
      {/* <div className="w-fit text-[#8381D9] text-base px-3 py-[2px] font-body bg-transparent border-[2px] border-[#8381D9] tracking-wider flex flex-row items-center gap-2 rounded-xl">
        <button className="border-r border-gray-300 h-6 pr-3">
          <LogOut size={20} className="rotate-180" />
        </button>
        <Avatar>
          <AvatarImage className='scale-75 rounded-full border-[3px] border-[#8381D9]' src="https://github.com/jtiagosantos.png" alt="@shadcn" />
          <AvatarFallback>TS</AvatarFallback>
        </Avatar>
        Tiago Santos
      </div>

      <div className="w-fit border-[2px] border-yellow-500 flex items-center gap-2 py-[10px] px-3 rounded-xl">
        <Zap size={22} className="text-yellow-500" />
        <p className="font-body font-semibold text-yellow-500 text-base">42</p>
      </div> */}
    </header>
  );
};
