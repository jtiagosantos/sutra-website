'use client';

import { FC, useEffect, useState } from 'react';
import { findMedalsAction } from '@/actions/find-medals-action';
import { findUserMedalsAction } from '@/actions/find-user-medals-action';
import { MoveLeft } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import Image from 'next/image'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import BadgeImage from '@/assets/badge.svg';
import dayjs from 'dayjs';
import { MedalModal } from './medal-modal';

type Medal = {
  id: string;
  image: string;
  name: string;
  description: string;
  levelRequired: number;
  earnedAt: string | null;
  viewedAt: string | null;
};

type PageComponentProps = {
  user: {
    email: string;
  };
};

export const PageComponent: FC<PageComponentProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [medalsData, setMedalsData] = useState<Medal[]>([]);
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  const { executeAsync: findMedalsActionExecute } = useAction(findMedalsAction);
  const { executeAsync: findUserMedalsActionExecute } = useAction(findUserMedalsAction);

  const handleFetchMedals = async () => {
    try {
      const [findMedalsActionResult, findUserMedalsActionResult] = await Promise.all([
        findMedalsActionExecute(),
        findUserMedalsActionExecute({ email: user.email })
      ]);

      const medals = findMedalsActionResult?.data?.medals!;
      const userMedals = findUserMedalsActionResult?.data?.userMedals!;

      const userMedalsIds = userMedals.map((userMedal) => userMedal.medalId);

      const data: Medal[] = [];

      medals.forEach((medal) => {
        if (userMedalsIds.includes(medal.id)) {
          const userMedal = userMedals.find((userMedal) => userMedal.medalId === medal.id)!;

          data.push({
            ...medal,
            id: userMedal.id,
            earnedAt: dayjs(userMedal.createdAt).format('DD/MM/YYYY'),
            viewedAt: userMedal.viewedAt ? dayjs(userMedal.viewedAt).format('DD/MM/YYYY') : null,
          });
        } else {
          data.push({
            ...medal,
            earnedAt: null,
            viewedAt: null,
          });
        }
      });

      setMedalsData(data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFetchMedals()
  }, []);

  return (
    <main className="w-full flex flex-col items-center mt-5 mb-5 px-4">
      <h1 className="font-heading text-[26px] text-center mt-8 text-[#8381D9] font-semibold">
        Minhas Medalhas
      </h1>
      <p className="font-body text-base text-gray-500 mt-4 max-w-[400px] text-center">
        Confira abaixo as medalhas conquistadas ao longo da sua jornada com quizzes literários
      </p>

      {isLoading ? (
        <div className="my-[100px]">
          <BubbleAnimation />
        </div>
      ) : (
        <div className={`mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6`}>
          {medalsData.map((medal) => {
            if (!medal.earnedAt) {
              return (
                <Popover key={medal.id}>
                  <PopoverTrigger>
                    <div key={medal.id} className="flex flex-col items-center">
                      <div className="relative">
                        <div className="relative size-[100px] rounded-lg overflow-hidden shadow-md shadow-gray-500 grayscale">
                          <Image
                            src={medal.image}
                            alt={medal.name}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg"
                            sizes='100px'
                          />
                        </div>
                        {medal.earnedAt && !medal.viewedAt && (
                          <div className="absolute -top-[14px] -right-[14px]">
                            <BadgeImage />
                            <p className="font-body text-white text-xs font-bold absolute top-[14px] right-[9px]">
                              Nova
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="font-body mt-2 text-[15px] font-medium text-gray-500 text-center">
                        {medal.name}
                      </p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    Alcançe o nível {medal.levelRequired} para ganhar esta medalha
                  </PopoverContent>
                </Popover>
              );
            }

            return (
              <div key={medal.id} className={`flex flex-col items-center ${!!medal.earnedAt && 'cursor-pointer'}`} onClick={() => setSelectedMedal(medal)}>
                <div className="relative">
                  <div className="relative size-[100px] rounded-lg overflow-hidden shadow-md shadow-gray-500">
                    <Image
                      src={medal.image}
                      alt={medal.name}
                      fill={true}
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                      sizes='100px'
                    />
                  </div>
                  {medal.earnedAt && !medal.viewedAt && (
                    <div className="absolute -top-[14px] -right-[14px]">
                      <BadgeImage />
                      <p className="font-body text-white text-xs font-bold absolute top-[14px] right-[9px]">
                        Nova
                      </p>
                    </div>
                  )}
                </div>
                <p className="font-body mt-2 text-[15px] font-medium text-gray-500 text-center">
                  {medal.name}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {!!selectedMedal && (
        <MedalModal
          open={!!selectedMedal}
          id={selectedMedal!.id}
          name={selectedMedal!.name}
          image={selectedMedal!.image}
          levelRequired={selectedMedal!.levelRequired}
          earnedAt={selectedMedal!.earnedAt!}
          viewedAt={selectedMedal!.viewedAt}
          onClose={() => setSelectedMedal(null)}
        />
      )}

      <Link
        href="/"
        className="mt-14 text-[#8381D9] w-fit flex items-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
        prefetch={false}>
        <MoveLeft className="w-5 h-5 pt-[3px]" />
        voltar
      </Link>
    </main>
  );
}