'use client';

import { QuizProvider } from "@/contexts/quiz-context";
import { UserProvider } from "@/contexts/user-context";
import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <SessionProvider>
      <UserProvider>
        <QuizProvider>
          {children}
        </QuizProvider>
      </UserProvider>
    </SessionProvider>
  );
}