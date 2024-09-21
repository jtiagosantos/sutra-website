'use client';

import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';
import { useState } from 'react';

export const AuthButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="text-white w-full py-[13px] rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0] hover:scale-110 transition-all duration-300">
        <Gamepad2 size={28} />
        Jogar Quiz
      </Button>
      <AuthModal open={open} onOpenChange={setOpen} redirectTo="/jogar" />
    </>
  );
};
