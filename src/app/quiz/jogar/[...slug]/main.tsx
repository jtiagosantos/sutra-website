'use client';

import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { CalculationAnswersLoading } from "./calculation-answers-loading";
import { LevelUpModal } from "@/components/level-up-modal";
import { useAction } from "next-safe-action/hooks";
import { useUser } from "@/hooks/use-user";
import { userCanPlayQuizAction } from "@/actions/user-can-play-quiz-action";
import { ExpiredLimitOfQuizzesPerDay } from "../../../../components/expired-limit-of-quizzes-per-day";
import { useQuizEngine } from "@/hooks/use-quiz-engine";
import { CurrentQuestion } from "./current-question";
import { QuizFinished } from "./quiz-finished";
import { Footer } from "./footer";

type MainProps = {
  bookName: string;
  quizId: string;
}

export const Main: FC<MainProps> = ({ bookName, quizId }) => {
  const { user } = useUser();
  const {
    currentQuizGame,
    quizStatus,
    answerStatus,
    level,
    isOpenLevelUpModal,
    isCalculatingAnswers,
    closeLevelUpModal,
  } = useQuizEngine();
  const router = useRouter();
  const { result, executeAsync } = useAction(userCanPlayQuizAction);
  const [marginBottom, setMarginBottom] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isCheckingUserCanPlay, setIsCheckingUserCanPlay] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);

  console.log('currentQuizGame', marginBottom);

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

  useEffect(() => {
    if (footerRef.current?.offsetHeight) {
      setMarginBottom(footerRef.current.offsetHeight);
    }
  }, [answerStatus, footerRef]);

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
    <main className="max-w-[600px] w-full mx-auto my-10 px-3">
      {quizStatus === 'RUNNING' && (
        <CurrentQuestion
          marginBottom={marginBottom}
        />
      )}

      {quizStatus === 'FINISHED' && (
        <QuizFinished
          executeOnMount={executeOnMount}
        />
      )}

      {isCalculatingAnswers && <CalculationAnswersLoading />}

      {!isCalculatingAnswers && isOpenLevelUpModal && (
        <LevelUpModal
          level={level}
          onContinue={closeLevelUpModal}
        />
      )}

      {quizStatus === 'RUNNING' && (
        <Footer
          footerRef={footerRef}
        />
      )}
    </main>
  );
}