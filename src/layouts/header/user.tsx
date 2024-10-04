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
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ToggleDailyRemainder } from './toggle-daily-remainder';

const FULL_PROGRESS_BAR = 10;

type UserProps = {
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  score: number;
  level: number;
  activeDailyRemainder: boolean;
}

export const User: FC<UserProps> = ({ email, avatar, firstName, lastName, score, level, activeDailyRemainder }) => {
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    let progress = (score / 2) * FULL_PROGRESS_BAR;

    if (level > 0) {
      progress = ((score / 2) % FULL_PROGRESS_BAR) * FULL_PROGRESS_BAR;
    }

    setProgress(progress);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateProgress();
    }, 250);

    return () => {
      clearTimeout(timeoutId);
    }
  }, []);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="w-[47px] h-[47px] flex items-center justify-center relative cursor-pointer">
            <div className="w-5 h-5 rounded-full bg-[#8381d9] flex items-center justify-center absolute z-10 -top-2.5">
              <span className="text-white text-[12px] font-body font-medium">{level}</span>
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
                src={avatar}
                alt={firstName.concat(' ').concat(lastName)}
              />
            </CircularProgressbarWithChildren>
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <ToggleDailyRemainder
            email={email}
            activeDailyRemainder={activeDailyRemainder}
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