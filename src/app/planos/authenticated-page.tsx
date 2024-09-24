'use client';

import { Check, Crown, BadgeCheck } from 'lucide-react';
import { CheckoutButton } from './checkout-button';
import { Session } from 'next-auth';
import { FC } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { getUserAction } from '@/actions/get-user-action';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { ManageSubscriptionButton } from './manage-subscription-button';

type AuthenticatedPageProps = {
  session: Session;
};

export const AuthenticatedPage: FC<AuthenticatedPageProps> = ({ session }) => {
  const { result, isPending, status } = useAction(getUserAction, {
    executeOnMount: {
      input: {
        email: session.user?.email!,
      },
    },
  });

  if (isPending || status !== 'hasSucceeded') {
    return (
      <main className="my-[100px]">
        <BubbleAnimation />
      </main>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-6 max-[680px]:grid-cols-1">
      <div className="border border-gray-300 rounded-lg overflow-hidden max-w-[400px] w-full">
        {result.data?.user?.subscription.status !== 'ACTIVE' && (
          <p className="w-full text-center uppercase bg-[#50B2C0] text-white py-1 tracking-wide">
            Plano Atual
          </p>
        )}
        <div className="w-full px-8 py-10 max-[680px]:px-6">
          <p className="font-body font-medium text-2xl text-gray-600 tracking-wide">
            Gratuito
          </p>
          <p className="mt-6 mb-4 font-body text-gray-700 flex items-start gap-[2px]">
            <span className="text-base text-gray-400 leading-8">R$</span>
            <span className="font-semibold text-5xl">0</span>
            <span className="text-base text-gray-400 leading-[60px]">/mês</span>
          </p>
          <ul className="flex flex-col gap-2">
            <li className="font-body font-medium text-base text-gray-600 flex items-center gap-1">
              <Check className="w-5 h-5 text-[#50B2C0]" />
              Apenas 1 quiz por dia
            </li>
            <li className="font-body font-medium text-base text-gray-600 flex items-center gap-1">
              <Check className="w-5 h-5 text-[#50B2C0]" />
              Quizzes com até 5 perguntas
            </li>
          </ul>
        </div>
      </div>
      <div className="border border-yellow-500 rounded-lg overflow-hidden max-w-[400px] w-full">
        {result.data?.user?.subscription.status === 'ACTIVE' && (
          <p className="w-full text-center uppercase bg-[#50B2C0] text-white py-1 tracking-wide">
            Plano Atual
          </p>
        )}
        <div className="w-full px-8 py-10 max-[680px]:px-6">
          <p className="font-body font-medium text-2xl text-yellow-500 tracking-wide flex items-center gap-1">
            <Crown size={28} />
            Premium
          </p>
          <p className="mt-6 mb-4 font-body text-gray-700 flex items-start gap-[2px]">
            <span className="text-base text-gray-400 leading-8">R$</span>
            <span className="font-semibold text-5xl">6,90</span>
            <span className="text-base text-gray-400 leading-[60px]">/mês</span>
          </p>
          <ul className="flex flex-col gap-2">
            <li className="font-body font-medium text-base text-gray-600 flex items-center gap-1">
              <BadgeCheck className="w-5 h-5 text-yellow-500" />
              Acesso a 10 quizzes por dia
            </li>
            <li className="font-body font-medium text-base text-gray-600 flex items-center gap-1">
              <BadgeCheck className="w-5 h-5 text-yellow-500" />
              Quizzes com até 15 perguntas
            </li>
            <li className="font-body font-medium text-base text-gray-600 flex items-center gap-1">
              <BadgeCheck className="w-5 h-5 text-yellow-500" />
              Acesso ao suporte
            </li>
            <li className="font-body font-medium text-base text-gray-600 flex items-center gap-1">
              <BadgeCheck className="w-5 h-5 text-yellow-500" />
              Cancele quando quiser
            </li>
          </ul>
        </div>
        {result.data?.user?.subscription.status !== 'ACTIVE' ? (
          <CheckoutButton user={{ email: session.user?.email! }} />
        ) : (
          <ManageSubscriptionButton user={{ email: session.user?.email! }} />
        )}
      </div>
    </div>
  );
};
