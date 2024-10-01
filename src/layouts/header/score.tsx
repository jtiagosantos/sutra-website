import { Zap } from 'lucide-react';
import { FC } from 'react';

type ScoreProps = {
  score: number;
};

export const Score: FC<ScoreProps> = ({ score }) => {
  return (
    <div className="w-[76px] border-[2px] border-yellow-500 flex items-center justify-center gap-2 py-[10px] px-3 rounded-xl">
      <Zap size={22} className="text-yellow-500" />
      <p className="font-body font-semibold text-yellow-500 text-base">
        {score}
      </p>
    </div>
  );
};
