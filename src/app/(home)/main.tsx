import LogoImage from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Gamepad2, Trophy, ScrollText, Crown } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';
import { AuthButton } from './auth-button';

export const Main = async () => {
  const session = await auth();

  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      <LogoImage />
      <h1 className="absolute text-transparent">Book Quiz</h1>
      <h2 className="font-heading text-2xl text-center mt-8 text-[#50B2C0] font-medium">
        Você Conhece Mesmo seus Livros Favoritos?
        <span className="block text-[#8381D9]">Descubra com Nossos Quizzes!</span>
      </h2>
      <h3 className="font-body text-[18px] my-6 max-w-[500px] text-center text-gray-500 leading-6">
        Gamifique sua leitura ao participar de quizzes interativos e transforme cada
        página em um desafio!
      </h3>

      <div className="max-w-[300px] w-full flex flex-col items-center justify-center gap-2">
        {!session ? <AuthButton /> : (
          <Link href="/jogar" className="tracking-wide font-medium text-white w-full py-[13px] rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0] hover:scale-110 transition-all duration-300">
            <Gamepad2 size={28} />
            Jogar Quiz
          </Link>
        )}
        <Button className="text-[#8381D9] w-full py-[13px] rounded-xl flex items-center gap-2 font-body text-[18px] bg-transparent border-[2px] border-[#8381D9]">
          <Trophy size={28} />
          Classificação
        </Button>
        <Button className="text-[#8381D9] w-full py-[13px] rounded-xl flex items-center gap-2 font-body text-[18px] bg-transparent border-[2px] border-[#8381D9]">
          <ScrollText size={28} />
          Como Jogar
        </Button>
        <Button className="text-yellow-500 w-full py-[13px] rounded-xl flex items-center gap-2 font-body text-[18px] bg-transparent border-[2px] border-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-300">
          <Crown size={28} />
          Seja Premium
        </Button>
      </div>
    </main>
  );
};
