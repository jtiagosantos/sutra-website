'use client';

import { useUser } from '@/hooks/use-user';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { QuizCard } from '@/components/quiz-card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Main = () => {
  const { user, loading } = useUser();

  return (
    <main className="max-w-[1464px] w-full mx-auto my-6 px-3">
      {loading ? (
        <div className="mx-auto w-fit my-[30px]">
          <BubbleAnimation />
        </div>
      ) : (
        <>
          <div className="w-full mx-auto">
            <p className="font-body font-medium text-base text-dimGray">
              {user ? `Olá, ${user!.firstName} ${user!.lastName}` : 'Olá, visitante'} :)
            </p>
            <p className="max-w-[330px] font-body font-medium text-base text-moonstone leading-[22px] mt-1">
              Você pode pesquisar por um quiz, filtrar os resultados por categoria ou ordená-los
            </p>
          </div>
        </>
      )}

      <div className="w-full mt-10 flex gap-4">
        <div className="max-w-[300px] w-full">
          <span className="font-body font-medium text-base text-tropicalIndigo block mb-1">Filtrar por categoria:</span>
          <select className="select w-full block bg-white border border-gray-300 min-h-[40px] h-[40px] focus:outline-tropicalIndigo font-body font-normal text-sm text-gray-500">
            <option className="font-body font-normal text-sm text-gray-500" disabled>Selecione uma categoria</option>
            <option className="font-body font-normal text-sm text-gray-500">Fantasia</option>
            <option className="font-body font-normal text-sm text-gray-500">Economia, História & Política</option>
            <option className="font-body font-normal text-sm text-gray-500">Distópico</option>
          </select>
        </div>
        <div className="max-w-[300px] w-full">
          <span className="font-body font-medium text-base text-tropicalIndigo block mb-1">Ordenar por:</span>
          <select className="select w-full block bg-white border border-gray-300 min-h-[40px] h-[40px] focus:outline-tropicalIndigo font-body font-normal text-sm text-gray-500">
            <option className="font-body font-normal text-sm text-gray-500" disabled>Selecione uma ordenação</option>
            <option className="font-body font-normal text-sm text-gray-500">Mais Recentes</option>
            <option className="font-body font-normal text-sm text-gray-500">Mais Antigos</option>
          </select>
        </div>
      </div>

      <div className="mt-[10px] w-full flex item-center gap-2 flex-wrap">
        <button className="bg-moonstone text-white flex items-center gap-1 py-[2px] px-2 rounded-full">
          <X size={16} strokeWidth={2.5} />
          Economia, História & Política
        </button>
        <button className="bg-moonstone text-white flex items-center gap-1 py-[2px] px-2 rounded-full">
          <X size={16} strokeWidth={2.5} />
          Mais recentes
        </button>
      </div>

      <section className="mt-10 grid grid-cols-5 gap-3 max-w-fit mx-auto max-[1245px]:grid-cols-4 max-[1000px]:grid-cols-3 max-[630px]:grid-cols-2">
        {[...new Array(15)].map((_, index) => (
          <QuizCard
            key={index}
            href="/quiz/jogar/id-do-quiz"
            image="https://bookquiz.s3.us-east-1.amazonaws.com/covers/ultra-aprendizado-1730739645248.png"
            author="Scott Young"
            title="Ultra Aprendizado: Aprenda Mais em Menos Tempo"
          />
        ))}
      </section>

      <Button
        className="w-fit mx-auto mt-10 text-white text-base bg-tropicalIndigo px-4 py-[9px] font-body border-[2px] border-tropicalIndigo tracking-wider hover:border-tropicalIndigo hover:bg-white hover:text-tropicalIndigo flex flex-row items-center gap-2 rounded-xl transition-all duration-300 max-[600px]:text-sm">
        Carregar mais
      </Button>
    </main>
  )
};
