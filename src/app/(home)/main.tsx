'use client';

import { Trophy, ScrollText, Crown, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { QuizCard } from '@/components/quiz-card';
import { createSlug } from '@/helpers/create-slug';
import { useQuiz } from '@/hooks/use-quiz';

export const Main = () => {
  const { user, loading } = useUser();
  const {
    isLoadingRecentQuizzes,
    isLoadingHotQuizzes,
    isLoadingQuizzesByCategory,
    recentQuizzes,
    hotQuizzes,
    quizzesByCategory,
  } = useQuiz();

  return (
    <main className="w-full mx-auto mt-6 mb-10">
      {loading ? (
        <div className="mx-auto w-fit my-[30px]">
          <BubbleAnimation />
        </div>
      ) : (
        <>
          <div className="max-w-[1464px] w-full mx-auto px-3">
            <p className="font-body font-medium text-base text-dimGray">
              {user ? `Olá, ${user!.firstName} ${user!.lastName}` : 'Olá, visitante'} :)
            </p>
            <p className="font-body font-medium text-base text-moonstone">Você Conhece Mesmo seus Livros Favoritos?</p>
            <p className="font-body font-medium text-base text-tropicalIndigo">Descubra com Nossos Quizzes!</p>
          </div>

          <div className="flex items-center gap-[10px] mt-5 max-w-[1464px] w-full mx-auto px-3 overflow-x-auto">
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
        {isLoadingRecentQuizzes ? (
          <div className="mx-auto w-fit">
            <BubbleAnimation />
          </div>
        ) : (
          <section className="w-full max-w-[1464px] mx-auto px-3">
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
                {recentQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    href={'/quiz/'.concat(createSlug(quiz.book.title)).concat('--').concat(quiz.id)}
                    image={quiz.book.cover}
                    author={quiz.book.author}
                    title={quiz.book.title}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <div className={`w-full py-10 pb-[30px] ${!isLoadingHotQuizzes && 'bg-lavenderBlush'}`}>
          {isLoadingHotQuizzes ? (
            <div className="mx-auto w-fit">
              <BubbleAnimation />
            </div>
          ) : (
            <section className="w-full max-w-[1464px] mx-auto px-3">
              <h2 className="font-heading font-bold text-[22px] text-indianRed leading-[22px] mb-3 max-[800px]:text-[18px]">
                🤩 Em alta na plataforma
              </h2>
              <div className="w-full overflow-x-auto scrollbar-thin px-[1px]">
                <div className="flex items-center gap-3 w-max mb-2">
                  {hotQuizzes.map((quiz) => (
                    <QuizCard
                      key={quiz.id}
                      href={'/quiz/'.concat(createSlug(quiz.book.title)).concat('--').concat(quiz.id)}
                      image={quiz.book.cover}
                      author={quiz.book.author}
                      title={quiz.book.title}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {isLoadingQuizzesByCategory ? (
          <div className="mx-auto w-fit">
            <BubbleAnimation />
          </div>
        ) : (
          <>
            {Object.keys(quizzesByCategory).map((category) => (
              <section key={quizzesByCategory[category].name} className="w-full max-w-[1464px] mx-auto px-3">
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="font-heading font-bold text-[22px] text-davysGray leading-[22px] max-[800px]:text-[18px]">
                    {quizzesByCategory[category].name}
                  </h2>
                  <Link href={`/explorar?categoria=${category}`} className="min-w-[95px] bg-white py-[6px] px-[10px] rounded-lg font-body font-medium text-sm text-tropicalIndigo flex items-center gap-[6px]">
                    Ver tudo
                    <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="w-full overflow-x-auto scrollbar-thin px-[1px]">
                  <div className="flex items-center gap-3 w-max mb-2">
                    {quizzesByCategory[category].quizzes.map((quiz) => (
                      <QuizCard
                        key={quiz.id}
                        href={'/quiz/'.concat(createSlug(quiz.book.title)).concat('--').concat(quiz.id)}
                        image={quiz.book.cover}
                        author={quiz.book.author}
                        title={quiz.book.title}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </main>
  )
};
