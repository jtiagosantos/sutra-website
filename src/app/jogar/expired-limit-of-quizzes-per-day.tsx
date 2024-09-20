import LogoImage from '@/assets/logo.svg';
import { Crown, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

type ExpiredLimitOfQuizzesPerDayProps = {
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'CANCELED';
}

export const ExpiredLimitOfQuizzesPerDay: FC<ExpiredLimitOfQuizzesPerDayProps> = ({ subscriptionStatus }) => {
  return (
    <>
      <LogoImage />

      {subscriptionStatus === 'ACTIVE' && (
        <h2 className="font-heading text-2xl text-center mt-8 text-[#50B2C0] font-medium">
          Você atingiu o limite de 10 quizzes por dia.
          <span className="block text-[#8381D9]">Volte amanhã para mais diversão :)</span>
        </h2>
      )}
      {subscriptionStatus !== 'ACTIVE' && (
        <>
          <h2 className="font-heading text-2xl text-center mt-8 text-[#50B2C0] font-medium">
            Você atingiu o limite de 1 quiz por dia.
            <span className="block text-gray-500">
              Usuários premium podem
              <span className="text-[#8381D9]"> jogar até 10 quizzes por dia :)</span>
            </span>
          </h2>
          <Link href="/planos" className="mt-10 max-w-[200px] tracking-wide font-medium text-yellow-500 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-transparent border-[2px] border-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-300">
            <Crown size={28} />
            Seja Premium
          </Link>
        </>
      )}

      <Link
        href="/"
        className="mt-10 text-[#8381D9] w-fit flex items-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
        prefetch={false}
      >
        <MoveLeft className="w-5 h-5 pt-[3px]" />
        voltar
      </Link>
    </>
  );
}