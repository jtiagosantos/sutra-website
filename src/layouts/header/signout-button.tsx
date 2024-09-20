'use client';

import { LogOut } from "lucide-react";
import { signOut } from 'next-auth/react';

export const SignoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="border-r border-gray-300 h-6 pr-3"
    >
      <LogOut size={20} className="rotate-180" />
    </button>
  );
}