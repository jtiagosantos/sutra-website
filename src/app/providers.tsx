'use client';

import { UserProvider } from "@/contexts/user-context";
import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SessionProvider>
  );
}