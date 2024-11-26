'use client';

import { useEffect, useState } from 'react';
import { findMedalsAction } from '@/actions/find-medals-action';
import { findUserMedalsAction } from '@/actions/find-user-medals-action';
import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import BadgeImage from '@/assets/badge.svg';
import dayjs from 'dayjs';
import { MedalModal } from './medal-modal';
import { BackButton } from '@/components/back-button';
import { useUser } from '@/hooks/use-user';

type Medal = {
  id: string;
  image: string;
  name: string;
  description: string;
  levelRequired: number;
  earnedAt: string | null;
  viewedAt: string | null;
};

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [medalsData, setMedalsData] = useState<Medal[]>([]);
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);
  const { user, loading } = useUser();

  const handleFetchMedals = async () => {
    try {
      const [findMedalsActionResult, findUserMedalsActionResult] = await Promise.all([
        findMedalsAction(),
        findUserMedalsAction({ id: user!.id })
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
    if (!!user) {
      handleFetchMedals();
    }
  }, [user]);

  return (
    <main className="max-w-[1464px] w-full mx-auto mt-6 mb-10 px-3">
      {loading ? (
        <div className="mx-auto w-fit my-[30px]">
          <BubbleAnimation />
        </div>
      ) : (
        <>
          <div className="w-full mx-auto">
            <p className="font-body font-medium text-base text-dimGray">
              {user ? `Olá, ${user!.firstName} ${user!.lastName}` : 'Olá, visitante'} :)
            </p>
            <p className="max-w-[330px] font-body font-medium text-base text-moonstone leading-[22px] mt-1">
              Confira as medalhas conquistadas ao longo da sua jornada com quizzes literários
            </p>
          </div>
        </>
      )}

      {isLoading ? (
        <div className="mx-auto w-fit my-[30px]">
          <BubbleAnimation />
        </div>
      ) : (
        <div className={`max-w-fit mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6`}>
          {medalsData.map((medal) => {
            if (!medal.earnedAt) {
              return (
                <Popover key={medal.id}>
                  <PopoverTrigger>
                    <div key={medal.id} className="flex flex-col items-center">
                      <div className="relative">
                        <div className="relative size-[120px] rounded-lg overflow-hidden shadow-md shadow-gray-500 grayscale">
                          <Image
                            src={medal.image}
                            alt={medal.name}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg"
                            sizes='120px'
                            quality={100}
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
                  <div className="relative size-[120px] rounded-lg overflow-hidden shadow-md shadow-gray-500">
                    <Image
                      src={medal.image}
                      alt={medal.name}
                      fill={true}
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                      sizes='120px'
                      quality={100}
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

      <BackButton />
    </main>
  );
}