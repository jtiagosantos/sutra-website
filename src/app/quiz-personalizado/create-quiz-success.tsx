import { Gamepad2, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuizEngine } from '@/hooks/use-quiz-engine';
import Link from 'next/link';
import { createSlug } from '@/helpers/create-slug';

export const CreateQuizSuccess = () => {
  const { currentQuizGame } = useQuizEngine();

  return (
    <>
      <h1 className="font-heading text-2xl text-center mt-8 text-[#8381D9] font-semibold">
        Tudo Pronto!
      </h1>
      <p className="font-body text-base text-gray-500 mt-4">
        Seu quiz foi criado com sucesso! Divirta-se :)
      </p>

      <PartyPopper
        color="#50B2C0"
        size={80}
        strokeWidth={1.7}
        className="mt-14 mb-[70px]"
      />

      <Link
        href={`/quiz/jogar/${createSlug(currentQuizGame!.book.title!)}--${currentQuizGame!.id}`}
        className=""
      >
        <Button
          className="text-white max-w-[300px] w-full py-[10px] px-4 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-tropicalIndigo">
          <Gamepad2 size={24} />
          Jogar Quiz
        </Button>
      </Link>
    </>
  );
};
