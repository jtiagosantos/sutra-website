import LogoImage from '@/assets/logo.svg';
import { Check, Crown, BadgeCheck, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';
import { AuthButton } from './auth-button';

export default async function Page() {
  const session = await auth();

  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      <LogoImage />

      <div className="mt-8 grid grid-cols-2 gap-6 max-[680px]:grid-cols-1">
        <div className="border border-gray-300 rounded-lg overflow-hidden max-w-[400px] w-full">
          <p className="w-full text-center uppercase bg-[#50B2C0] text-white py-1 tracking-wide">
            Plano Atual
          </p>
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
          <div className="w-full px-8 py-10 max-[680px]:px-6">
            <p className="font-body font-medium text-2xl text-yellow-500 tracking-wide flex items-center gap-1">
              <Crown size={28} />
              Premium
            </p>
            <p className="mt-6 mb-4 font-body text-gray-700 flex items-start gap-[2px]">
              <span className="text-base text-gray-400 leading-8">R$</span>
              <span className="font-semibold text-5xl">5,90</span>
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
          {!session ? (
            <AuthButton />
          ) : (
            <button className="w-full bg-yellow-500 font-body font-medium text-[18px] text-white tracking-wide py-1">
              Escolher Plano
            </button>
          )}
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 text-[#8381D9] w-fit flex items-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
        prefetch={false}>
        <MoveLeft className="w-5 h-5 pt-[3px]" />
        voltar
      </Link>
    </main>
  );
}
