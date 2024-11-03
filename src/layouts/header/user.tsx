'use client';

import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOut, Medal } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ToggleDailyRemainder } from './toggle-daily-remainder';
import Link from 'next/link';
import { Session } from 'next-auth';
import { useAction } from 'next-safe-action/hooks';
import { getUserAction } from '@/actions/get-user-action';
import { Oval } from 'react-loader-spinner';

const FULL_PROGRESS_BAR = 10;

type UserProps = {
  session: Session | null;
}

export const User: FC<UserProps> = ({ session }) => {
  const { result, isExecuting, execute } = useAction(getUserAction);
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    const { score, level } = result.data?.user!;

    let progress = (score / 2) * FULL_PROGRESS_BAR;

    if (level > 0) {
      progress = ((score / 2) % FULL_PROGRESS_BAR) * FULL_PROGRESS_BAR;
    }

    setProgress(progress);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!!session && !!result.data) {
      timeoutId = setTimeout(() => {
        calculateProgress();
      }, 250);
    }

    return () => {
      clearTimeout(timeoutId);
    }
  }, [session, result]);

  useEffect(() => {
    if (!!session) {
      execute({
        email: session.user?.email!,
      });
    }
  }, [session]);

  if (isExecuting || !result.data) {
    return (
      <Oval
        visible={true}
        height="47"
        width="47"
        color="#8381d9"
        ariaLabel="oval-loading"
        secondaryColor="#e5e7eb "
        strokeWidth={4.5}
      />
    );
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="w-[47px] h-[47px] flex items-center justify-center relative cursor-pointer">
            <div className="w-5 h-5 rounded-full bg-[#8381d9] flex items-center justify-center absolute z-10 -top-2.5">
              <span className="text-white text-[12px] font-body font-medium">{result.data?.user?.level!}</span>
            </div>
            <CircularProgressbarWithChildren
              value={progress}
              strokeWidth={10}
              styles={buildStyles({
                trailColor: "#e5e7eb",
                pathColor: "#8381d9",
              })}
            >
              <Image
                width={39.5}
                height={39.5}
                className="rounded-full"
                quality={100}
                src={result.data?.user?.avatar!}
                alt={result.data?.user?.firstName!.concat(' ').concat(result.data?.user?.lastName!)!}
              />
            </CircularProgressbarWithChildren>
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <Link href="/medalhas">
            <MenubarItem className="flex items-center gap-2 focus:bg-[#8381d9] hover:bg-[#8381d9] focus:text-white hover:text-white transition-all duration-300">
              <Medal size={18} />
              Minhas medalhas
            </MenubarItem>
          </Link>
          <ToggleDailyRemainder
            email={result.data?.user?.email!}
            activeDailyRemainder={result.data?.user?.preferences?.active_daily_reminder!}
          />
          <MenubarItem
            className="flex items-center gap-2 focus:bg-[#8381d9] hover:bg-[#8381d9] focus:text-white hover:text-white transition-all duration-300"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut size={18} className="rotate-180" />
            Sair da conta
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}