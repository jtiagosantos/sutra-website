'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
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
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOut, Medal, Zap } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ToggleDailyRemainder } from './toggle-daily-remainder';
import Link from 'next/link';
import { Oval } from 'react-loader-spinner';
import { useUser } from '@/hooks/use-user';

const FULL_PROGRESS_BAR = 10;

export const User = () => {
  const { user, setUser, loading, progress, setProgress, forceRefetchProgress, setForceRefetchProgress } = useUser();

  const calculateProgress = () => {
    const { score, level } = user!;

    let progress = (score / 2) * FULL_PROGRESS_BAR;

    if (level > 0) {
      progress = ((score / 2) % FULL_PROGRESS_BAR) * FULL_PROGRESS_BAR;
    }

    setProgress(progress);
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setUser(null);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!!user && progress === undefined) {
      timeoutId = setTimeout(() => {
        calculateProgress();
      }, 150);
    }

    return () => {
      clearTimeout(timeoutId);
    }
  }, [user]);

  useEffect(() => {
    if (forceRefetchProgress) {
      calculateProgress();
      setForceRefetchProgress(false);
    }
  }, [forceRefetchProgress])

  if (loading || !user) {
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
              <span className="text-white text-[12px] font-body font-medium">{user!.level}</span>
            </div>
            <CircularProgressbarWithChildren
              value={progress ?? 0}
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
                src={user!.avatar}
                alt={user!.firstName.concat(' ').concat(user!.lastName)!}
              />
            </CircularProgressbarWithChildren>
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled className="flex items-center gap-2 text-yellow-500 data-[disabled]:opacity-100">
            <Zap size={18} />
            Meus pontos - {user!.score}
          </MenubarItem>

          <MenubarSeparator />

          <Link href="/medalhas">
            <MenubarItem className="flex items-center gap-2 focus:bg-[#8381d9] hover:bg-[#8381d9] focus:text-white hover:text-white transition-all duration-300">
              <Medal size={18} />
              Minhas medalhas
            </MenubarItem>
          </Link>
          <ToggleDailyRemainder />
          <MenubarItem
            className="flex items-center gap-2 focus:bg-[#8381d9] hover:bg-[#8381d9] focus:text-white hover:text-white transition-all duration-300"
            onClick={handleSignOut}
          >
            <LogOut size={18} className="rotate-180" />
            Sair da conta
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}