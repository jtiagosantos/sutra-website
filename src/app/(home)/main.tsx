'use client';

import { Trophy, ScrollText, Crown, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/hooks/use-user';
import BubbleAnimation from '@/assets/bubble-spinner.svg';

export const Main = () => {
  const { user, loading } = useUser();

  return (
    <main className="w-full mx-auto my-6">
      {loading ? (
        <div className="mx-auto w-fit my-[30px]">
          <BubbleAnimation />
        </div>
      ) : (
        <>
          <div className="max-w-[1440px] w-full mx-auto px-3">
            <p className="font-body font-medium text-base text-dimGray">
              {user ? `Olá, ${user!.firstName} ${user!.lastName}` : 'Olá, visitante'} :)
            </p>
            <p className="font-body font-medium text-base text-moonstone">Você Conhece Mesmo seus Livros Favoritos?</p>
            <p className="font-body font-medium text-base text-tropicalIndigo">Descubra com Nossos Quizzes!</p>
          </div>

          <div className="flex items-center gap-[10px] mt-5 max-w-[1440px] w-full mx-auto px-3 overflow-x-auto">
            <Link href="/quiz-personalizado" className="mb-[10px] min-w-[183px] font-body text-tropicalIndigo font-medium text-sm tracking-wide flex items-center gap-[6px] border-[2px] border-tropicalIndigo rounded-full px-3 py-[10px] shadow-md shadow-gray-300">
              <Bot size={22} />
              Quiz Personalizado
            </Link>
            <Link href="/classificacao" className="mb-[10px] font-body text-dimGray font-medium text-sm tracking-wide flex items-center gap-[6px] border-[2px] border-silver rounded-full px-3 py-[10px] shadow-md shadow-gray-300">
              <Trophy size={22} />
              Classificação
            </Link>
            <Link href="/instrucoes" className="mb-[10px] font-body text-dimGray font-medium text-sm tracking-wide flex items-center gap-[6px] border-[2px] border-silver rounded-full px-3 py-[10px] shadow-md shadow-gray-300">
              <ScrollText size={22} />
              Instruções
            </Link>
            <Link href="/planos" className="mb-[10px] min-w-[148px] font-body text-xanthous font-medium text-sm tracking-wide flex items-center gap-[6px] border-[2px] border-xanthous rounded-full px-3 py-[10px] shadow-md shadow-gray-300">
              <Crown size={22} />
              Seja Premium
            </Link>
          </div>
        </>
      )}

      <div className="w-full mt-10 flex flex-col gap-[50px]">
        <section className="w-full max-w-[1440px] mx-auto px-3">
          <div className="mb-2 flex items-center gap-3">
            <h2 className="font-heading font-bold text-[22px] text-davysGray leading-[22px] max-[800px]:text-[18px]">
              Recentes
            </h2>
            <Link href="/explorar?categoria=Fantasia" className="min-w-[95px] bg-white py-[6px] px-[10px] rounded-lg font-body font-medium text-sm text-tropicalIndigo flex items-center gap-[6px]">
              Ver tudo
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="w-full overflow-x-auto scrollbar-thin px-[1px]">
            <div className="flex items-center gap-3 w-max mb-2">
              {[...new Array(10)].map((_, index) => (
                <Link href="/quiz/jogar/id-do-quiz" key={index}>
                  <div className="max-w-[240px] min-h-[270px] bg-white rounded-lg shadow-sm shadow-gray-300 overflow-hidden max-[800px]:max-w-[200px] max-[800px]:max-h-[230px] max-[800px]:min-h-[230px]">
                    <div className="w-full h-[180px] relative max-[800px]:h-[140px]">
                      <Image
                        src="https://bookquiz.s3.us-east-1.amazonaws.com/covers/ultra-aprendizado-1730739645248.png"
                        alt=""
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="w-full p-2">
                      <p className="font-body font-normal text-sm text-dimGray">Scott Young</p>
                      <p className="font-body font-medium text-sm text-jet overflow-hidden line-clamp-2 mt-[6px]">
                        Ultra Aprendizado: Aprenda Mais em Menos Tempo
                        do autor Scott Young
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="w-ful bg-lavenderBlush py-10 pb-[30px]">
          <section className="w-full max-w-[1440px] mx-auto px-3">
            <h2 className="font-heading font-bold text-[22px] text-indianRed leading-[22px] mb-3 max-[800px]:text-[18px]">
              🤩 Em alta na plataforma
            </h2>
            <div className="w-full overflow-x-auto scrollbar-thin px-[1px]">
              <div className="flex items-center gap-3 w-max mb-2">
                {[...new Array(10)].map((_, index) => (
                  <Link href="/quiz/jogar/id-do-quiz" key={index}>
                    <div className="max-w-[240px] min-h-[270px] bg-white rounded-lg shadow-sm shadow-gray-300 overflow-hidden max-[800px]:max-w-[200px] max-[800px]:max-h-[230px] max-[800px]:min-h-[230px]">
                      <div className="w-full h-[180px] relative max-[800px]:h-[140px]">
                        <Image
                          src="https://bookquiz.s3.us-east-1.amazonaws.com/covers/ultra-aprendizado-1730739645248.png"
                          alt=""
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="w-full p-2">
                        <p className="font-body font-normal text-sm text-dimGray">Scott Young</p>
                        <p className="font-body font-medium text-sm text-jet overflow-hidden line-clamp-2 mt-[6px]">
                          Ultra Aprendizado: Aprenda Mais em Menos Tempo
                          do autor Scott Young
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
};
