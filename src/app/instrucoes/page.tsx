import LogoImage from '@/assets/logo.svg';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      <LogoImage />
      <h1 className="font-heading text-[26px] text-center mt-8 text-[#8381D9] font-semibold">
        Como Jogar?
      </h1>
      <p className="font-body text-base text-gray-500 mt-4">
        Cada quiz é uma nova diversão!
      </p>
      <p className="font-body text-base text-gray-500 mt-1 text-center">
        Descubra segredos, curiosidades e fatos sobre seus livros favoritos.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 max-[480px]:items-start">
        <p className="font-body font-semibold text-gray-700 text-xl text-left">
          1. Clique em <span className="text-[#50B2C0]">"Jogar Quiz"</span>.
        </p>
        <p className="font-body font-semibold text-gray-700 text-xl text-left">
          2. Forneça as informações necessárias para criarmos o seu quiz.
        </p>
        <p className="font-body font-semibold text-gray-700 text-xl text-left">
          3. Responda as perguntas e divirta-se.
        </p>
        <p className="font-body font-semibold text-gray-700 text-xl text-left">
          4. Compartilhe o resultado com seus amigos.
        </p>
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
