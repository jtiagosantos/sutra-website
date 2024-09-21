'use client';

import { getUserScoreAction } from '@/actions/get-user-score';
import { Zap } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

type ScoreProps = {
  user: {
    email: string;
  };
};

export const Score: FC<ScoreProps> = ({ user }) => {
  const { result, isPending, status } = useAction(getUserScoreAction, {
    executeOnMount: {
      input: {
        email: user.email,
      },
    },
  });

  return (
    <div className="w-[76px] border-[2px] border-yellow-500 flex items-center justify-center gap-2 py-[10px] px-3 rounded-xl">
      {isPending || status !== 'hasSucceeded' ? (
        <ThreeDots
          height="24"
          width="40"
          radius="9"
          color="#eab308"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        <>
          <Zap size={22} className="text-yellow-500" />
          <p className="font-body font-semibold text-yellow-500 text-base">
            {result.data?.score}
          </p>
        </>
      )}
    </div>
  );
};
