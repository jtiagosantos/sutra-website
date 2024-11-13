'use client';

import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Gamepad2, MoveLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { CalculationAnswersLoading } from "./calculation-answers-loading";
import { LevelUpModal } from "@/components/level-up-modal";
import { useAction } from "next-safe-action/hooks";
import { useUser } from "@/hooks/use-user";
import { userCanPlayQuizAction } from "@/actions/user-can-play-quiz-action";
import { ExpiredLimitOfQuizzesPerDay } from "./expired-limit-of-quizzes-per-day";
import { useQuizEngine } from "@/hooks/use-quiz-engine";
import { BackButton } from "@/components/back-button";

type MainProps = {
  bookName: string;
  quizId: string;
}

export const Main: FC<MainProps> = ({ bookName, quizId }) => {
  const { user } = useUser();
  const {
    currentQuizGame,
    questionIndex,
    numberOfQuestions,
    progress,
    isLastQuestion,
    currentQuestion,
    currentCorrectAnswer,
    quizStatus,
    selectedAnswerId,
    disableAnwsers,
    answerStatus,
    level,
    isOpenLevelUpModal,
    numberOfCorrectAnswers,
    isCalculatingAnswers,
    setSelectedAnswerId,
    checkAnswer,
    goToNextQuestion,
    closeLevelUpModal,
    finishQuiz,
    resetEngine,
  } = useQuizEngine();
  const router = useRouter();
  const pathname = usePathname();
  const { result, executeAsync } = useAction(userCanPlayQuizAction);
  const [marginBottom, setMarginBottom] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isCheckingUserCanPlay, setIsCheckingUserCanPlay] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);

  const executeOnMount = async () => {
    setIsCheckingUserCanPlay(true);

    if (!currentQuizGame) {
      setIsRedirecting(true);
      setIsCheckingUserCanPlay(false);

      router.replace(`/quiz/${bookName}--${quizId}`);

      return;
    }

    await executeAsync({
      id: user!.id,
    });

    setIsCheckingUserCanPlay(false);
  }

  const handleShareQuiz = () => {
    const [bookName, quizId] = pathname.replace('/quiz/jogar/', '').split('--');

    navigator.share({
      title: 'Sutra',
      text: 'Junte-se a mim e descubra o quanto você conhece sobre seus livros favoritos!',
      url: `${window.location.origin}/quiz/${bookName}--${quizId}`,
    });
  };

  const handleLeaveQuiz = () => {
    const [bookName, quizId] = pathname.replace('/quiz/jogar/', '').split('--');

    router.push(`/quiz/${bookName}--${quizId}`);

    resetEngine();
  }

  const handlePlayAgain = () => {
    executeOnMount();
    resetEngine();
  }

  useEffect(() => {
    if (footerRef.current?.offsetHeight) {
      setMarginBottom(footerRef.current.offsetHeight);
    }
  }, [answerStatus]);

  useEffect(() => {
    executeOnMount();
  }, [currentQuizGame]);

  if (!currentQuizGame || isRedirecting || isCheckingUserCanPlay) {
    return (
      <main className="w-full flex flex-col items-center mt-[200px] mb-5 px-4">
        <BubbleAnimation />
        {isRedirecting && (
          <p className="font-body font-semibold text-xl text-gray-500 mt-6">Redirecionando...</p>
        )}
      </main>
    );
  }

  if (result?.data?.canPlay === false) {
    return (
      <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
        <ExpiredLimitOfQuizzesPerDay
          subscriptionStatus={result.data?.subscriptionStatus!}
        />
      </main>
    );
  }

  return (
    <main className="max-w-[600px] w-full mx-auto my-10">
      {quizStatus === 'RUNNING' && (
        <>
          <div className="flex flex-col items-center gap-2">
            <p className="font-body font-semibold text-[18px] text-gray-500">
              {questionIndex} / {numberOfQuestions}
            </p>
            <Progress value={progress} className="w-full bg-gray-200" />
          </div>

          <div style={{ marginBottom }}>
            <h2 className="w-full text-center mt-8 font-body text-[18px] text-gray-600 font-medium leading-7">
              {currentQuestion!.title}
            </h2>

            <div className="w-full flex flex-col gap-3 mt-6">
              {currentQuestion!.answers.map((answer) => {
                const isUnselected = selectedAnswerId !== answer.id;
                const isSelected = !answerStatus && selectedAnswerId === answer.id;
                const isCorrect = answerStatus === 'CORRECT' && selectedAnswerId === answer.id;
                const isIncorrect = answerStatus === 'INCORRECT' && selectedAnswerId === answer.id;

                return (
                  <button
                    key={answer.id}
                    onClick={() => setSelectedAnswerId(answer.id)}
                    disabled={disableAnwsers}
                    className={clsx('p-[10px] rounded-lg border-[1px] font-body font-normal text-[18px] text-left', {
                      'text-[#868686] border-[#bebdbd]': isUnselected,
                      'text-[#50B2C0] border-[#50B2C0]': isSelected,
                      'text-white border-green-500 bg-green-500': isCorrect,
                      'text-white border-[#ee5959] bg-[#ee5959]': isIncorrect,
                    })}>
                    {answer.text}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {quizStatus === 'FINISHED' && (
        <>
          <div className="w-full flex items-center gap-4 max-[430px]:flex-col">
            <div className="w-full bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 p-4 py-6 flex flex-col items-center gap-2">
              <span className="text-2xl">🤩</span>
              <span className="font-body font-semibold text-xl text-gray-600">
                {numberOfQuestions}
              </span>
              <span className="font-body font-normal text-base text-gray-600">
                Perguntas no Total
              </span>
            </div>
            <div className="w-full bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 p-4 py-6 flex flex-col items-center gap-2">
              <span className="text-2xl">😎</span>
              <span className="font-body font-semibold text-xl text-gray-600">
                {numberOfCorrectAnswers}
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
              onClick={handleShareQuiz}
              className="text-white w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0]">
              <Share2 size={24} />
              Compartilhar resultado
            </Button>
          </div>

          <BackButton
            title="voltar para o início"
          />
        </>
      )}

      {isCalculatingAnswers && <CalculationAnswersLoading />}

      {!isCalculatingAnswers && isOpenLevelUpModal && (
        <LevelUpModal
          level={level}
          onContinue={closeLevelUpModal}
        />
      )}

      {quizStatus === 'RUNNING' && (
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
              <button
                onClick={handleLeaveQuiz}
                className="text-[#bebdbd] border-[2px] border-[#bebdbd] w-fit px-4 py-2 rounded-xl uppercase flex items-center justify-center gap-[6px] font-heading font-bold tracking-wider hover:bg-gray-200 hover:brightness-90 transition-all duration-300 max-[430px]:w-full">
                Sair do quiz
              </button>
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
                        {currentCorrectAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {!selectedAnswerId && (
              <Button
                disabled={!selectedAnswerId}
                className="font-heading font-bold tracking-wider uppercase w-fit px-4 py-2 rounded-xl border-[2px] disabled:opacity-100 text-[#bebdbd] bg-gray-200 border-gray-200 max-[430px]:w-full"
              >
                Verificar
              </Button>
            )}
            {(isLastQuestion && !!answerStatus) ? (
              <Button
                disabled={!selectedAnswerId}
                onClick={finishQuiz}
                className={clsx('font-heading font-bold tracking-wider uppercase w-fit px-4 py-2 rounded-xl border-[2px] max-[430px]:w-full transition-all duration-300', {
                  'text-white bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600': !!selectedAnswerId || answerStatus === 'CORRECT',
                  'text-white bg-[#ee5959] border-[#ee5959] hover:bg-red-600 hover:border-red-600': answerStatus === 'INCORRECT',
                })}
              >
                Finalizar
              </Button>
            ) : (
              <>
                {!!selectedAnswerId && (
                  <Button
                    disabled={!selectedAnswerId}
                    onClick={() => !answerStatus ? checkAnswer(selectedAnswerId) : goToNextQuestion()}
                    className={clsx('font-heading font-bold tracking-wider uppercase w-fit px-4 py-2 rounded-xl border-[2px] max-[430px]:w-full transition-all duration-300', {
                      'text-white bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600': !!selectedAnswerId || answerStatus === 'CORRECT',
                      'text-white bg-[#ee5959] border-[#ee5959] hover:bg-red-600 hover:border-red-600': answerStatus === 'INCORRECT',
                    })}
                  >
                    {!answerStatus ? 'Verificar' : 'Continuar'}
                  </Button>
                )}
              </>
            )}
          </div>
        </footer>
      )}
    </main>
  );
}