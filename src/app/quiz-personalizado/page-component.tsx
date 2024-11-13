'use client';

import { CreateQuizLoading } from './creating-quiz-loading';
import { CreateQuizForm } from './create-quiz-form';
import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { useAction } from 'next-safe-action/hooks';
import { FC, useState } from 'react';
import { userCanPlayQuizAction } from '@/actions/user-can-play-quiz-action';
import { Quiz as Quiztype } from '@/types/quiz';
import { Book } from '@/types/book';

type PageComponentProps = {
  user: {
    email: string;
  };
};

export const PageComponent: FC<PageComponentProps> = ({ user }) => {
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [createQuizStatus, setCreateQuizStatus] = useState<
    'SUCCESS' | 'ERROR' | 'CAN_PLAY' | null
  >(null);
  const [book, setBook] = useState<Book | null>(null);
  const [quiz, setQuiz] = useState<Quiztype | null>(null);

  const { result, isPending, status } = useAction(userCanPlayQuizAction, {
    executeOnMount: {
      input: {
        email: user.email,
      },
    },
  });

  if (isPending || status !== 'hasSucceeded') {
    return (
      <main className="w-full flex flex-col items-center mt-[200px] mb-5 px-4">
        <BubbleAnimation />
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col items-center mt-10 mb-5 px-4">
      {result.data?.canPlay && !isCreatingQuiz && createQuizStatus !== 'CAN_PLAY' && (
        <CreateQuizForm
          subscriptionStatus={result.data?.subscriptionStatus!}
          onSubmit={() => setIsCreatingQuiz(true)}
          onCreateQuiz={() => setIsCreatingQuiz(false)}
          createQuizStatus={createQuizStatus!}
          setCreateQuizStatus={setCreateQuizStatus}
          setQuiz={setQuiz}
          setBook={setBook}
        />
      )}

      {isCreatingQuiz && <CreateQuizLoading />}
    </main>
  );
};
