'use client';

import { setUserMedalAsViewedAction } from '@/actions/set-user-medal-as-viewed-action';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAction } from 'next-safe-action/hooks';
import Image from 'next/image';
import { FC } from 'react';
import BubbleAnimation from '@/assets/bubble-spinner.svg';

type MedalModalProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  image: string;
  levelRequired: number;
  name: string;
  earnedAt: string;
  viewedAt: string | null;
}

export const MedalModal: FC<MedalModalProps> = ({ open, onClose, id, image, levelRequired, name, earnedAt, viewedAt }) => {
  const { isExecuting } = useAction(setUserMedalAsViewedAction, {
    executeOnMount: !!viewedAt ? undefined : {
      input: {
        id
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white py-7 w-full">
        <div className="w-full flex flex-col items-center">
          {isExecuting && (
            <div className="my-[35px]">
              <BubbleAnimation />
            </div>
          )}
          {!isExecuting && (
            <div className="w-full flex items-center justify-start gap-5">
              <div className="relative min-w-[160px] h-[150px] rounded-xl overflow-hidden shadow-lg shadow-gray-500">
                <Image
                  src={image}
                  alt={name}
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  sizes='160px'
                  quality={100}
                />
              </div>
              <div>
                <p className="font-body text-gray-600 font-medium">
                  Você alcançou o nível {levelRequired} e ganhou a medalha {name}
                </p>
                <div className="w-fit bg-yellow-500 rounded-md py-1 px-[6px] mt-6 mb-2">
                  <p className="font-body font-medium text-sm text-white tracking-wide">{earnedAt}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}