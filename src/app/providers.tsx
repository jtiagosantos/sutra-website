'use client';

import { QuizProvider } from "@/contexts/quiz-context";
import { QuizEngineProvider } from "@/contexts/quiz-engine-context";
import { UserProvider } from "@/contexts/user-context";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <SessionProvider>
      <NuqsAdapter>
        <UserProvider>
          <QuizEngineProvider>
            <QuizProvider>
              {children}
            </QuizProvider>
          </QuizEngineProvider>
        </UserProvider>
      </NuqsAdapter>
    </SessionProvider>
  );
}