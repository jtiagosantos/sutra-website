'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CircleCheck, CircleX, Gamepad2, MoveLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { CalculationAnswersLoading } from './calculation-answers-loading';
import { Quiz as QuizType } from '@/types/quiz';
import { quizDoneAction } from '@/actions/quiz-done-action';
import { saveQuizAction } from '@/actions/save-quiz-action';
import { Book } from '@/types/book';
import { LevelUpModal } from '@/components/level-up-modal';
import clsx from 'clsx';

const FULL_PROGRESS_BAR = 100;

type QuizProps = {
  quiz: QuizType;
  book: Book;
  user: {
    email: string;
  };
};

export const Quiz: FC<QuizProps> = ({ quiz: { questions }, book, user }) => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [areAnswersDisabled, setAreAnswersDisabled] = useState(false);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [isCalculatingAnswers, setIsCalculatingAnswers] = useState(false);
  const [isOpenLevelUpModal, setIsOpenLevelUpModal] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'CORRECT' | 'INCORRECT' | null>(null);
  const [marginBottom, setMarginBottom] = useState(0);
  const [level, setLevel] = useState(0);
  const totalCorrectAnswers = useRef(0);
  const footerRef = useRef<HTMLDivElement>(null);

  const totalQuestions = questions.length;
  const progress = questionIndex * (FULL_PROGRESS_BAR / totalQuestions);
  const isLastQuestion = questionIndex === totalQuestions;
  const question = questions[questionIndex - 1];
  const correctAnswer = question.answers.find((answer) => answer.id === question.correct)?.text;

  const handleQuizDone = async () => {
    try {
      setIsCalculatingAnswers(true);

      const result = await quizDoneAction({
        email: user.email,
        score: totalCorrectAnswers.current,
      });

      await saveQuizAction({
        book,
        questions,
        email: user.email,
      });

      if (result?.data?.leveledUp) {
        setIsOpenLevelUpModal(true);
        setLevel(result.data.level);
      }
    } finally {
      setIsCalculatingAnswers(false);
    }
  };

  const handleAnswerQuestion = async (answerId: string) => {
    if (question.correct === answerId) {
      totalCorrectAnswers.current++;
      setAnswerStatus('CORRECT');
    } else {
      setAnswerStatus('INCORRECT');
    }
  };

  const handleClickOnActionButton = async () => {
    if (!answerStatus) {
      handleAnswerQuestion(selectedAnswerId!);
      setAreAnswersDisabled(true);

      return;
    }

    if (isLastQuestion) {
      await handleQuizDone();
      setIsQuizDone(true);
    } else {
      setQuestionIndex((state) => state + 1);
      setSelectedAnswerId(null);
      setAnswerStatus(null);
      setAreAnswersDisabled(false);
    }
  }

  const handlePlayAgain = () => {
    window.location.reload();
  }

  const handleShareResult = () => {
    navigator.share({
      title: 'Book Quiz',
      text: 'Junte-se a mim e descubra o quanto você conhece sobre seus livros favoritos!',
      url: window.location.origin,
    });
  };

  useEffect(() => {
    if (footerRef.current?.offsetHeight) {
      setMarginBottom(footerRef.current.offsetHeight);
    }
  }, [answerStatus]);

  return (
    <div className="max-w-[600px] w-full mx-auto">
      {!isQuizDone && (
        <>
          <div className="flex flex-col items-center gap-2">
            <p className="font-body font-semibold text-[18px] text-gray-500">
              {questionIndex} / {totalQuestions}
            </p>
            <Progress value={progress} className="w-full bg-gray-200" />
          </div>

          <div style={{ marginBottom }}>
            <h2 className="w-full text-center mt-8 font-body text-[18px] text-gray-600 font-medium leading-7">
              {question.title}
            </h2>

            <div className="w-full flex flex-col gap-3 mt-6">
              {question.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => setSelectedAnswerId(answer.id)}
                  disabled={areAnswersDisabled}
                  className={clsx('p-[10px] rounded-lg border-[1px] font-body font-normal text-[18px] text-left', {
                    'text-[#868686] border-[#bebdbd]': selectedAnswerId !== answer.id,
                    'text-[#50B2C0] border-[#50B2C0]': !answerStatus && selectedAnswerId === answer.id,
                    'text-white border-green-500 bg-green-500': answerStatus === 'CORRECT' && selectedAnswerId === answer.id,
                    'text-white border-[#ee5959] bg-[#ee5959]': answerStatus === 'INCORRECT' && selectedAnswerId === answer.id,
                  })}>
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {isQuizDone && (
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
          <div className="w-full flex flex-col justify-center gap-3 mt-6">
            <Button
              onClick={handlePlayAgain}
              className="text-white w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0]">
              <Gamepad2 size={24} />
              Jogar novamente
            </Button>
            <Button
              onClick={handleShareResult}
              className="text-white w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0]">
              <Share2 size={24} />
              Compartilhar resultado
            </Button>
          </div>

          <Link
            href="/"
            className="mt-10 text-[#8381D9] w-full flex items-center justify-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
            prefetch={false}>
            <MoveLeft className="w-5 h-5 pt-[3px]" />
            Voltar para o início
          </Link>
        </>
      )}

      {isCalculatingAnswers && <CalculationAnswersLoading />}

      {!isCalculatingAnswers && isOpenLevelUpModal && (
        <LevelUpModal
          level={level}
          onContinue={() => setIsOpenLevelUpModal(false)}
        />
      )}

      {!isQuizDone && (
        <footer ref={footerRef} className={clsx('w-full border-t-[2px] mt-10 fixed bottom-0 left-0 z-20', {
          'border-t-gray-200 bg-white': !answerStatus,
          'border-t-green-100 bg-green-100': answerStatus === 'CORRECT',
          'border-t-red-100 bg-red-100': answerStatus === 'INCORRECT'
        })}>
          <div className={clsx('max-w-[600px] w-full mx-auto py-10 flex items-center justify-between gap-3 max-[630px]:px-4', {
            'max-[430px]:flex-col-reverse': !answerStatus,
            'max-[430px]:flex-col gap-4': !!answerStatus
          })}>
            {!answerStatus ? (
              <Link
                href="/"
                className="text-[#bebdbd] border-[2px] border-[#bebdbd] w-fit px-4 py-2 rounded-xl uppercase flex items-center justify-center gap-[6px] font-heading font-bold tracking-wider hover:bg-gray-200 hover:brightness-90 transition-all duration-300 max-[430px]:w-full"
                prefetch={false}>
                Sair do quiz
              </Link>
            ) : (
              <>
                {answerStatus === 'CORRECT' && (
                  <div className="flex items-center gap-2">
                    <CircleCheck size={30} className="text-green-500" />
                    <p className="font-body font-medium text-green-500 text-xl">Correto!</p>
                  </div>
                )}
                {answerStatus === 'INCORRECT' && (
                  <div className="max-w-[408px] w-full">
                    <div className="flex items-center gap-2">
                      <CircleX size={30} className="text-[#ee5959]" />
                      <p className="font-body font-medium text-[#ee5959] text-xl">Incorreto!</p>
                    </div>
                    <div className="mt-2">
                      <p className="font-body font-medium text-[#ee5959] text-sm">
                        Resposta correta:
                      </p>
                      <p className="font-body font-normal text-[#ee5959] text-sm">
                        {correctAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            <Button
              disabled={!selectedAnswerId}
              onClick={handleClickOnActionButton}
              className={clsx('font-heading font-bold tracking-wider uppercase w-fit px-4 py-2 rounded-xl border-[2px] max-[430px]:w-full', {
                'disabled:opacity-100 text-[#bebdbd] bg-gray-200 border-gray-200': !selectedAnswerId,
                'text-white bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 transition-all duration-300': !!selectedAnswerId || answerStatus === 'CORRECT',
                'text-white bg-[#ee5959] border-[#ee5959] hover:bg-red-600 hover:border-red-600 transition-all duration-300': answerStatus === 'INCORRECT',
              })}
            >
              {(isLastQuestion && !!answerStatus) ? 'Finalizar' : !answerStatus ? 'Verificar' : 'Continuar'}
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};
