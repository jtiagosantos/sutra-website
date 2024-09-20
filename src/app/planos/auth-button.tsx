'use client';

import { AuthModal } from "@/components/auth-modal";
import { useState } from "react";

export const AuthButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-yellow-500 font-body font-medium text-[18px] text-white tracking-wide py-1"
      >
        Escolher Plano
      </button>
      <AuthModal open={open} onOpenChange={setOpen} redirectTo="/planos" />
    </>
  );
}