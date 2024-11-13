import LogoImage from '@/assets/logo.svg';
import { BackButton } from '@/components/back-button';
import { Crown } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

type ExpiredLimitOfQuizzesPerDayProps = {
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'CANCELED';
  showLogoImage?: boolean;
};

export const ExpiredLimitOfQuizzesPerDay: FC<ExpiredLimitOfQuizzesPerDayProps> = ({
  subscriptionStatus,
  showLogoImage = true,
}) => {
  return (
    <>
      {showLogoImage && <LogoImage />}

      {subscriptionStatus === 'ACTIVE' && (
        <h2 className="font-heading text-xl text-center mt-8 text-[#50B2C0] font-medium">
          Você atingiu o limite de 15 quizzes por dia.
          <span className="block text-[#8381D9]">Volte amanhã para mais diversão :)</span>
        </h2>
      )}
      {subscriptionStatus !== 'ACTIVE' && (
        <>
          <h2 className="font-heading text-xl text-center mt-8 text-[#50B2C0] font-medium">
            Você atingiu o limite de 3 quizzes por dia.
            <span className="block text-gray-500">
              Usuários premium podem
              <span className="text-[#8381D9]"> jogar até 15 quizzes por dia :)</span>
            </span>
          </h2>
          <Link
            href="/planos"
            className="mt-10 max-w-[200px] tracking-wide font-medium text-yellow-500 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-transparent border-[2px] border-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-300">
            <Crown size={28} />
            Seja Premium
          </Link>
        </>
      )}

      <BackButton />
    </>
  );
};
