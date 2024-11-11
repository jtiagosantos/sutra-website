'use client';

import { useUser } from '@/hooks/use-user';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { QuizCard } from '@/components/quiz-card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { findQuizCategoriesAction } from '@/actions/find-quiz-categories-action';
import { findQuizzesAction } from '@/actions/find-quizzes-action';
import { createSlug } from '@/helpers/create-slug';
import { useQueryState } from 'nuqs';

type Quiz = {
  id: string;
  book: {
    title: string;
    author: string;
    cover: string;
  };
}

type By = 'asc' | 'desc';

type OrderBy = Record<By, string>;

export const Main = () => {
  const { user, loading } = useUser();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [category, setCategory] = useState<Record<string, string> | null>(null);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingQuizzesByParams, setIsLoadingQuizzesByParams] = useState(false);
  const [categoryNameByValue, setCategoryNameByValue] = useState<Record<string, string>>({});
  const [metadata, setMetadata] = useState<{ next: number | null }>({ next: null });
  const { result: quizCategoriesResult, status: quizCategoriesStatus } = useAction(findQuizCategoriesAction, {
    executeOnMount: {}
  });
  const { result: quizzesResult, status: quizzesStatus } = useAction(findQuizzesAction, {
    executeOnMount: {
      input: {
        categories: category ? [Object.keys(category)[0]] : undefined,
        createdAt: orderBy ? Object.keys(orderBy)[0] as By : undefined,
      },
    },
  });

  const [categoryParam, setCategoryParam] = useQueryState('categoria');
  const [orderByParam, setOrderByParam] = useQueryState('ordenar');

  const isLoadingQuizCategories = ['idle', 'executing'].includes(quizCategoriesStatus);
  const isLoadingQuizzes = ['idle', 'executing'].includes(quizzesStatus);

  const handleLoadMoreQuizzes = async () => {
    setIsLoadingMore(true);

    const result = await findQuizzesAction({
      page: metadata?.next ?? undefined,
      categories: category ? [Object.keys(category)[0]] : undefined,
      createdAt: orderBy ? Object.keys(orderBy)[0] as By : undefined,
    });

    if (result?.data?.quizzes) {
      setQuizzes((prev) => [...prev, ...result!.data!.quizzes]);
      setMetadata(result!.data!.metadata);
    }

    setIsLoadingMore(false);
  }

  const handleLoadQuizzesByParams = async () => {
    setIsLoadingQuizzesByParams(true);

    const result = await findQuizzesAction({
      categories: category ? [Object.keys(category)[0]] : undefined,
      createdAt: orderBy ? Object.keys(orderBy)[0] as By : undefined,
    });

    if (result?.data?.quizzes) {
      setQuizzes(result.data.quizzes);
      setMetadata(result.data.metadata);
    }

    setIsLoadingQuizzesByParams(false);
  }

  const handleUnselectCategory = async () => {
    setCategory(null);
    setCategoryParam(null);

    setIsLoadingQuizzesByParams(true);

    const result = await findQuizzesAction({
      categories: undefined,
      createdAt: orderBy ? Object.keys(orderBy)[0] as By : undefined,
    });

    if (result?.data?.quizzes) {
      setQuizzes(result.data.quizzes);
      setMetadata(result.data.metadata);
    }

    setIsLoadingQuizzesByParams(false);
  }

  const handleUnselectOrderBy = async () => {
    setOrderBy(null);
    setOrderByParam(null);

    setIsLoadingQuizzesByParams(true);

    const result = await findQuizzesAction({
      categories: category ? [Object.keys(category)[0]] : undefined,
      createdAt: undefined,
    });

    if (result?.data?.quizzes) {
      setQuizzes(result.data.quizzes);
      setMetadata(result.data.metadata);
    }

    setIsLoadingQuizzesByParams(false);
  }

  useEffect(() => {
    if (!!quizzesResult.data?.quizzes) {
      setQuizzes(quizzesResult.data.quizzes);
      setMetadata(quizzesResult.data.metadata);
    }
  }, [quizzesResult]);

  useEffect(() => {
    if (category || orderBy) {
      handleLoadQuizzesByParams();
    }
  }, [category, orderBy]);

  useEffect(() => {
    if (!!quizCategoriesResult.data?.categories) {
      const data = {} as Record<string, string>;

      quizCategoriesResult?.data?.categories?.forEach(category => {
        data[category.value] = category.name;
      });

      setCategoryNameByValue(data);
    }
  }, [quizCategoriesResult]);

  useEffect(() => {
    if (!!categoryParam && Object.keys(categoryNameByValue).includes(categoryParam)) {
      const name = categoryNameByValue[categoryParam];
      setCategory({ [categoryParam]: name });
    }
  }, [categoryParam, categoryNameByValue]);

  useEffect(() => {
    if (!!orderByParam) {
      setOrderBy({
        [orderByParam]: orderByParam === 'asc' ? 'Mais Antigos' : 'Mais Recentes'
      } as OrderBy);
    }
  }, [orderByParam]);

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

      {isLoadingQuizCategories ? (
        <div className="mx-auto w-fit mt-[50px]">
          <BubbleAnimation />
        </div>
      ) : (
        <>
          <div className="w-full mt-10 flex gap-3 max-[490px]:flex-col">
            <div className="max-w-[300px] w-full">
              <span className="font-body font-medium text-base text-tropicalIndigo block mb-1">Filtrar por categoria:</span>
              <select
                disabled={isLoadingQuizCategories || isLoadingQuizzes || isLoadingQuizzesByParams}
                value={category ? `${Object.keys(category)[0]}--${Object.values(category)[0]}` : 'none'}
                onChange={({ target }) => {
                  const [value, name] = target.value.split('--');
                  setCategory({ [value]: name });
                  setCategoryParam(value);
                }}
                className="select w-full block bg-white disabled:bg-white border border-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:opacity-100 min-h-[40px] h-[40px] focus:outline-tropicalIndigo font-body font-normal text-sm text-gray-500"
              >
                <option className="font-body font-normal text-sm text-gray-500" value="none" disabled>
                  Selecione uma categoria
                </option>
                {quizCategoriesResult.data?.categories?.map((category) => (
                  <option
                    key={category.id}
                    className="font-body font-normal text-sm text-gray-500"
                    value={`${category.value}--${category.name}`}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="max-w-[300px] w-full">
              <span className="font-body font-medium text-base text-tropicalIndigo block mb-1">Ordenar por:</span>
              <select
                disabled={isLoadingQuizCategories || isLoadingQuizzes || isLoadingQuizzesByParams}
                value={orderBy ? `${Object.keys(orderBy)[0]}--${Object.values(orderBy)[0]}` : 'none'}
                onChange={({ target }) => {
                  const [order, orderBy] = target.value.split('--');
                  setOrderBy({ [order]: orderBy } as OrderBy);
                  setOrderByParam(order);
                }}
                className="select w-full block bg-white disabled:bg-white border border-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:opacity-100 min-h-[40px] h-[40px] focus:outline-tropicalIndigo font-body font-normal text-sm text-gray-500"
              >
                <option className="font-body font-normal text-sm text-gray-500" value="none" disabled>
                  Selecione uma ordenação
                </option>
                <option className="font-body font-normal text-sm text-gray-500" value="desc--Mais Recentes">
                  Mais Recentes
                </option>
                <option className="font-body font-normal text-sm text-gray-500" value="asc--Mais Antigos">
                  Mais Antigos
                </option>
              </select>
            </div>
          </div>

          <div className="mt-[10px] w-full flex item-center gap-2 flex-wrap">
            {!!category && (
              <button
                onClick={handleUnselectCategory}
                className="bg-moonstone text-white flex items-center gap-1 pt-[2px] pb-[4px] pl-2 pr-[10px] rounded-full"
              >
                <X size={18} strokeWidth={2.5} className="pt-[2px]" />
                {Object.values(category)[0]}
              </button>
            )}
            {!!orderBy && (
              <button
                onClick={handleUnselectOrderBy}
                className="bg-moonstone text-white flex items-center gap-1 pt-[2px] pb-[4px] pl-2 pr-[10px] rounded-full"
              >
                <X size={18} strokeWidth={2.5} className="pt-[2px]" />
                {Object.values(orderBy)[0]}
              </button>
            )}
          </div>
        </>
      )}

      {(isLoadingQuizzes || isLoadingQuizzesByParams) ? (
        <div className="mx-auto w-fit mt-[50px]">
          <BubbleAnimation />
        </div>
      ) : (
        <>
          <section className="mt-10 grid grid-cols-5 gap-3 max-w-fit mx-auto max-[1245px]:grid-cols-4 max-[1000px]:grid-cols-3 max-[630px]:grid-cols-2">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                href={'/quiz/'.concat(createSlug(quiz.book.title)).concat('--').concat(quiz.id)}
                image={quiz.book.cover}
                author={quiz.book.author}
                title={quiz.book.title}
              />
            ))}
          </section>

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
    </main>
  )
};
