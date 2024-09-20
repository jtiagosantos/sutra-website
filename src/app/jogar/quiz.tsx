'use client';

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MoveLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import { CalculationAnswersLoading } from "./calculation-answers-loading";
import { Quiz as QuizType } from "@/types/quiz";
import { quizDoneAction } from "@/actions/quiz-done-action";
import { saveQuizAction } from "@/actions/save-quiz-action";
import { Book } from "@/types/book";

const FULL_PROGRESS_BAR = 100;
const ONE_SECOND = 1000;

type QuizProps = {
  quiz: QuizType;
  book: Book;
  user: {
    email: string;
  }
}

export const Quiz: FC<QuizProps> = ({ quiz: { questions }, book, user }) => {
  const { toast, dismiss } = useToast();
  const [questionIndex, setQuestionIndex] = useState(1);
  const [areAnswersDisabled, setAreAnswersDisabled] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isCalculatingAnswers, setIsCalculatingAnswers] = useState(false);
  const totalCorrectAnswers = useRef(0);

  const totalQuestions = 5;
  const progress = questionIndex * (FULL_PROGRESS_BAR / totalQuestions);
  const isLastQuestion = questionIndex === totalQuestions;
  const question = questions[questionIndex - 1];

  const handleQuizDone = async () => {
    try {
      setIsCalculatingAnswers(true);

      await quizDoneAction({
        email: user.email,
        score: totalCorrectAnswers.current,
      });

      await saveQuizAction({
        book,
        questions,
        email: user.email,
      })
    } finally {
      setIsCalculatingAnswers(false);
    }
  };

  const handleAnswerQuestion = async (answerId: string) => {
    setAreAnswersDisabled(true);

    let toastRef: { id: string };

    if (question.correct === answerId) {
      totalCorrectAnswers.current++;
      toastRef = toast({
        title: 'Resposta Certa!',
        variant: 'success',
      });
    } else {
      toastRef = toast({
        title: 'Resposta Errada!',
        variant: 'destructive',
      });
    }

    await new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        dismiss(toastRef.id);

        if (!isLastQuestion) {
          setQuestionIndex((state) => state + 1);
        }
        setAreAnswersDisabled(false);

        resolve(timeoutId);
      }, ONE_SECOND);
    }).then((timeoutId) => {
      clearTimeout(timeoutId as NodeJS.Timeout);
    });

    if (isLastQuestion) {
      await handleQuizDone();
      setIsQuizFinished(true);
    }
  };

  return (
    <div className="max-w-[600px] w-full mx-auto">
      {!isQuizFinished && (
        <>
          <div className="flex flex-col items-center gap-2">
            <p className="font-body font-semibold text-[18px] text-gray-500">
              {questionIndex} / {totalQuestions}
            </p>
            <Progress value={progress} className="w-full bg-gray-200" />
          </div>

          <h2 className="w-full text-center mt-8 font-body text-[18px] text-gray-600 font-medium leading-7">
            {question.title}
          </h2>

          <div className="w-full flex flex-col gap-3 mt-6">
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerQuestion(answer.id)}
                disabled={areAnswersDisabled}
                className="bg-[#50B2C0] p-[10px] rounded-md text-white font-body font-normal text-[18px] text-left hover:scale-110 transition-all duration-300">
                {answer.text}
              </button>
            ))}
          </div>
        </>
      )}

      {isQuizFinished && (
        <>
          <div className="w-full flex items-center gap-4 max-[430px]:flex-col">
            <div className="w-full bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 p-4 py-6 flex flex-col items-center gap-2">
              <span className="text-2xl">🤩</span>
              <span className="font-body font-semibold text-xl text-gray-600">
                {totalQuestions}
              </span>
              <span className="font-body font-normal text-base text-gray-600">
                Perguntas no Total
              </span>
            </div>
            <div className="w-full bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 p-4 py-6 flex flex-col items-center gap-2">
              <span className="text-2xl">😎</span>
              <span className="font-body font-semibold text-xl text-gray-600">
                {totalCorrectAnswers.current}
              </span>
              <span className="font-body font-normal text-base text-gray-600">
                Respostas Corretas
              </span>
            </div>
          </div>
          {/* TODO: implement function to this button */}
          <div className="w-full flex justify-center">
            <Button className="mt-6 text-white w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0]">
              <Share2 size={24} />
              Compartilhar resultado
            </Button>
          </div>
        </>
      )}

      {isCalculatingAnswers && <CalculationAnswersLoading />}

      <Link
        href="/"
        className="mt-10 text-[#8381D9] w-full flex items-center justify-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
        prefetch={false}
      >
        <MoveLeft className="w-5 h-5 pt-[3px]" />
        Sair do quiz
      </Link>
    </div>
  );
}