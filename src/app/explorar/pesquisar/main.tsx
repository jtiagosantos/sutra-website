'use client';

import { useUser } from "@/hooks/use-user";
import { useSearchParams } from "next/navigation";
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { QuizCard } from "@/components/quiz-card";
import { createSlug } from "@/helpers/create-slug";
import { useAction } from "next-safe-action/hooks";
import { searchQuizzesAction } from "@/actions/search-quizzes-action";
import { useEffect, useState } from "react";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Quiz = {
  id: string;
  book: {
    title: string;
    author: string;
    cover: string;
  };
}

export const Main = () => {
  const { user, loading } = useUser();
  const searchParams = useSearchParams();
  const search = searchParams.get('busca');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [metadata, setMetadata] = useState<{ next: number | null }>({ next: null });
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMoreQuizzes = async () => {
    setIsLoadingMore(true);

    const tags = createSlug(search!).split('-');

    const result = await searchQuizzesAction({
      page: metadata?.next ?? undefined,
      tags,
    });

    if (result?.data?.quizzes) {
      setQuizzes((prev) => [...prev, ...result!.data!.quizzes]);
      setMetadata(result!.data!.metadata);
    }

    setIsLoadingMore(false);
  }

  const handleLoadInitialQuizzes = async () => {
    setIsLoadingInitial(true);

    const tags = createSlug(search!).split('-');

    const result = await searchQuizzesAction({
      tags,
    });

    if (result?.data?.quizzes) {
      setQuizzes(result!.data!.quizzes);
      setMetadata(result!.data.metadata);
    }

    setIsLoadingInitial(false);
  }

  useEffect(() => {
    if (search) {
      handleLoadInitialQuizzes();
    }
  }, [search]);

  return (
    <main className="max-w-[1464px] w-full mx-auto mt-6 mb-10 px-3">
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

      <section className="mt-10">
        <h2 className="font-heading font-medium text-davysGray text-[18px]">Resultados da busca "{search}"</h2>
        {isLoadingInitial ? (
          <div className="mx-auto w-fit mt-[50px]">
            <BubbleAnimation />
          </div>
        ) : (
          <>
            {quizzes.length > 0 ? (
              <div className="mt-10 grid grid-cols-5 gap-3 max-w-fit mx-auto max-[1245px]:grid-cols-4 max-[1000px]:grid-cols-3 max-[630px]:grid-cols-2">
                {quizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    href={'/quiz/'.concat(createSlug(quiz.book.title)).concat('--').concat(quiz.id)}
                    image={quiz.book.cover}
                    author={quiz.book.author}
                    title={quiz.book.title}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10">
                <Frown size={50} strokeWidth={1.5} />
                <p className="text-center mt-2 font-body font-medium text-base text-dimGray">
                  Nenhum quiz encontrado
                </p>
              </div>
            )}

            {isLoadingMore ? (
              <div className="mx-auto w-fit mt-[50px]">
                <BubbleAnimation />
              </div>
            ) : (
              <>
                {metadata?.next && (
                  <Button
                    onClick={handleLoadMoreQuizzes}
                    className="w-fit mx-auto mt-10 text-white text-base bg-tropicalIndigo px-4 py-[9px] font-body border-[2px] border-tropicalIndigo tracking-wider hover:border-tropicalIndigo hover:bg-white hover:text-tropicalIndigo flex flex-row items-center gap-2 rounded-xl transition-all duration-300 max-[600px]:text-sm"
                  >
                    Carregar mais
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}