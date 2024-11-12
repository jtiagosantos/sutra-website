'use client';

import { Button } from "@/components/ui/button";
import { ChevronDown, Ellipsis, Gamepad2, Share2 } from "lucide-react";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BackButton } from "@/components/back-button";
import { FC, useEffect, useState } from "react";
import { getQuizAction } from "@/actions/get-quiz-action";
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { findQuizCategoriesAction } from "@/actions/find-quiz-categories-action";
import { findQuizzesAction } from "@/actions/find-quizzes-action";
import { createSlug } from "@/helpers/create-slug";
import { QuizCard } from "@/components/quiz-card";

type RelatedQuiz = {
  id: string;
  book: {
    title: string;
    author: string;
    cover: string;
  };
}

type QuizProps = {
  id: string;
  book: {
    title: string;
    author: string;
    cover: string;
  };
  summary: string;
  categories: string[];
}

type MainProps = {
  quizId: string;
}

export const Main: FC<MainProps> = ({ quizId }) => {
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);
  const [isLoadingRelatedQuizzes, setIsLoadingRelatedQuizzes] = useState(true);
  const [quiz, setQuiz] = useState<QuizProps | null>(null);
  const [relatedQuizzes, setRelatedQuizzes] = useState<RelatedQuiz[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [openSummary, setOpenSummary] = useState(false);

  const handleLoadQuiz = async () => {
    const { data: quizData } = (await getQuizAction({ id: quizId }))!;
    const { data: categoriesData } = (await findQuizCategoriesAction())!;

    const categoryNameByValue = {} as Record<string, string>;
    categoriesData?.categories.forEach(category => {
      categoryNameByValue[category.value] = category.name;
    });

    const categories = (quizData?.quiz?.categories.map((category) => categoryNameByValue[category]))!;

    setQuiz({
      id: quizData?.quiz?.id!,
      book: {
        title: quizData?.quiz?.book.title!,
        author: quizData?.quiz?.book.author!,
        cover: quizData?.quiz?.book.cover!,
      },
      summary: quizData?.quiz?.summary!,
      categories,
    });
    setCategories(quizData?.quiz?.categories!);
  }

  const handleLoadRelatedQuizzes = async () => {
    const { data: quizzesData } = (await findQuizzesAction({
      categories,
    }))!

    setRelatedQuizzes(quizzesData?.quizzes?.filter((quiz) => quiz.id !== quizId) ?? []);
  }

  const handleShareQuiz = () => {
    navigator.share({
      title: 'Book Quiz',
      text: 'Junte-se a mim e descubra o quanto você conhece sobre seus livros favoritos!',
      url: window.location.href,
    });
  }

  useEffect(() => {
    handleLoadQuiz().then(() => setIsLoadingQuiz(false));
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      handleLoadRelatedQuizzes().then(() => setIsLoadingRelatedQuizzes(false));
    }
  }, [categories]);

  return (
    <main className="max-w-[1140px] w-full mx-auto mt-6 mb-10 px-3">
      {isLoadingQuiz ? (
        <div className="mx-auto w-fit my-[30px]">
          <BubbleAnimation />
        </div>
      ) : (
        <section className="w-full flex items-start gap-10 max-[880px]:flex-col max-[880px]:items-center">
          <div className="w-[430px] aspect-square rounded-lg overflow-hidden relative max-[970px]:min-w-[352px] max-[456px]:min-w-full max-[456px]:max-w-fit">
            <Image
              src={quiz?.book.cover ?? ''}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </div>

          <div>
            <div className="w-full flex items-start justify-between gap-3">
              <h2 className="font-heading font-bold text-xl text-davysGray">
                {quiz?.book.title}
              </h2>

              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="bg-[#EAEAEA] rounded-full w-[38px] h-[22px] flex items-center justify-center cursor-pointer">
                    <Ellipsis size={24} className="text-dimGray" />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem
                      onClick={handleShareQuiz}
                      className="flex items-center gap-2 focus:bg-[#8381d9] hover:bg-[#8381d9] focus:text-white hover:text-white transition-all duration-300"
                    >
                      <Share2 size={18} />
                      Compartilhar quiz
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>

            <p className="font-body font-medium text-base text-davysGray mt-[-5px]">
              {quiz?.book.author}
            </p>

            <div className="w-full flex items-center gap-[6px] flex-wrap mt-3">
              {quiz?.categories?.map((category) => (
                <p
                  key={category}
                  className="h-[30px] flex justify-center items-center bg-dimGray rounded-lg text-white font-body font-normal text-[13px] py-[11px] w-fit px-2"
                >
                  {category}
                </p>
              ))}
            </div>

            <p className="max-w-[664px] w-full mt-5 font-body font-normal text-davysGray leading-6">
              {openSummary ? quiz?.summary : quiz?.summary.slice(0, 250).concat('...')}
            </p>

            <button
              onClick={() => setOpenSummary(!openSummary)}
              className="w-full flex items-center gap-1 text-tropicalIndigo font-body font-medium mt-2 mb-6"
            >
              Mostrar {openSummary ? 'menos' : 'mais'}
              <ChevronDown
                size={22}
                strokeWidth={2.5}
                className={`transform ${openSummary ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
              />
            </button>

            <Button
              variant="outline"
              className="text-white text-base bg-tropicalIndigo px-4 py-[9px] font-body border-[2px] border-tropicalIndigo tracking-wider hover:border-tropicalIndigo hover:bg-white hover:text-tropicalIndigo flex flex-row items-center gap-2 rounded-xl transition-all duration-300">
              <Gamepad2 size={24} className="max-[600px]:hidden" />
              Jogar Quiz
            </Button>
          </div>
        </section>
      )}

      <section className="w-full max-w-[1464px] mx-auto mt-[40px]">
        {isLoadingRelatedQuizzes && (
          <div className="mx-auto w-fit my-[30px]">
            <BubbleAnimation />
          </div>
        )}
        {!isLoadingRelatedQuizzes && relatedQuizzes.length > 0 && (
          <>
            <div className="mb-2 flex items-center gap-3">
              <h2 className="font-heading font-bold text-[22px] text-davysGray leading-[22px] max-[800px]:text-[18px]">
                🎯 Quizzes relacionados
              </h2>
            </div>
            <div className="w-full overflow-x-auto scrollbar-thin px-[1px]">
              <div className="flex items-center gap-3 w-max mb-2">
                {relatedQuizzes.map((quiz) => (
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
          </>
        )}
      </section>

      <BackButton />
    </main>
  );
}