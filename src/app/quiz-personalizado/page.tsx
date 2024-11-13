'use client';

import { CreateQuizLoading } from './creating-quiz-loading';
import { CreateQuizForm } from './create-quiz-form';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { userCanPlayQuizAction } from '@/actions/user-can-play-quiz-action';
import { useUser } from '@/hooks/use-user';
import LogoImage from '@/assets/logo.svg';

export type CreateQuizStatus = 'SUCCESS' | 'ERROR' | 'CAN_PLAY' | null;

export default function Page() {
  const { user } = useUser();
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { result, executeAsync } = useAction(userCanPlayQuizAction);
  const [createQuizStatus, setCreateQuizStatus] = useState<CreateQuizStatus>(null);

  useEffect(() => {
    if (user) {
      executeAsync({ id: user.id }).then(() => setIsLoading(false));
    }
  }, [user]);

  if (isLoading) {
    return (
      <main className="w-full flex flex-col items-center mt-[200px] mb-5 px-4">
        <BubbleAnimation />
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      <LogoImage />

      {result.data?.canPlay && !isCreatingQuiz && (
        <CreateQuizForm
          onSubmit={() => setIsCreatingQuiz(true)}
          onCreateQuiz={() => setIsCreatingQuiz(false)}
          createQuizStatus={createQuizStatus!}
          setCreateQuizStatus={setCreateQuizStatus}
        />
      )}

      {isCreatingQuiz && <CreateQuizLoading />}
    </main>
  );
};
