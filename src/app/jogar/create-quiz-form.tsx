import { createQuizAction } from '@/actions/create-quiz-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Question, Quiz } from '@/types/quiz';
import { Crown, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { CreateQuizError } from './create-quiz-error';
import { CreateQuizSuccess } from './create-quiz-success';
import { Book } from '@/types/book';

type CreateQuizFormProps = {
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'CANCELED';
  onSubmit: () => void;
  onCreateQuiz: () => void;
  createQuizStatus: 'SUCCESS' | 'ERROR' | 'CAN_PLAY';
  setCreateQuizStatus: (status: 'SUCCESS' | 'ERROR' | 'CAN_PLAY' | null) => void;
  setQuiz: (quiz: Quiz) => void;
  setBook: (book: Book) => void;
};

export const CreateQuizForm: FC<CreateQuizFormProps> = ({
  subscriptionStatus,
  onSubmit,
  onCreateQuiz,
  createQuizStatus,
  setCreateQuizStatus,
  setQuiz,
  setBook,
}) => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [quantityOfQuestions, setQuantityOfQuestions] = useState('');
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isFilledForm = !!bookName && !!authorName && !!quantityOfQuestions;

  const handleCreateQuiz = async () => {
    if (!isFilledForm) {
      alert('Preencha todos os campos');
      return;
    }

    if (subscriptionStatus !== 'ACTIVE' && Number(quantityOfQuestions) > 5) {
      alert(
        'Você precisa ser usuário premium para criar quizzes com mais de 5 perguntas',
      );
      return;
    }

    console.time();

    onSubmit();

    const promises = [];

    try {
      if (quantityOfQuestions === '5') {
        promises.push(
          createQuizAction({
            bookName,
            authorName,
            quantityOfQuestions: 5,
          }),
        );
      } else if (quantityOfQuestions === '10') {
        promises.push(
          createQuizAction({
            bookName,
            authorName,
            quantityOfQuestions: 5,
          }),
        );
        promises.push(
          createQuizAction({
            bookName,
            authorName,
            quantityOfQuestions: 5,
          }),
        );
      } else if (quantityOfQuestions === '15') {
        promises.push(
          createQuizAction({
            bookName,
            authorName,
            quantityOfQuestions: 5,
          }),
        );
        promises.push(
          createQuizAction({
            bookName,
            authorName,
            quantityOfQuestions: 5,
          }),
        );
        promises.push(
          createQuizAction({
            bookName,
            authorName,
            quantityOfQuestions: 5,
          }),
        );
      }

      const [batch1, batch2, batch3] = await Promise.all([...promises]);

      if (quantityOfQuestions === '5' && !batch1?.data?.quiz) {
        setCreateQuizStatus('ERROR');
        return;
      } else if (
        quantityOfQuestions === '10' &&
        (!batch1?.data?.quiz || !batch2?.data?.quiz)
      ) {
        setCreateQuizStatus('ERROR');
        return;
      } else if (
        quantityOfQuestions === '15' &&
        (!batch1?.data?.quiz || !batch2?.data?.quiz || !batch3?.data?.quiz)
      ) {
        setCreateQuizStatus('ERROR');
        return;
      }

      setCreateQuizStatus('SUCCESS');

      const result: Question[] = [
        ...batch1?.data?.quiz?.questions,
        ...(batch2?.data?.quiz?.questions ?? []),
        ...(batch3?.data?.quiz?.questions ?? []),
      ];

      const questions = result.map((question: Question) => ({
        title: question.title,
        correct: question.correct,
        answers: question.answers
          .sort(() => Math.random() - 0.5)
          .map((answer) => ({
            id: answer.id,
            text: answer.text,
          })),
      }));

      setQuiz({ questions });
      setBook({ title: bookName, author: authorName });
      onCreateQuiz();

      console.timeEnd();
    } catch {
      setCreateQuizStatus('ERROR');
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (createQuizStatus === 'SUCCESS') {
    return <CreateQuizSuccess onPlay={() => setCreateQuizStatus('CAN_PLAY')} />;
  }

  if (createQuizStatus === 'ERROR') {
    return <CreateQuizError tryAgain={handleCreateQuiz} />;
  }

  return (
    <>
      <h1 className="font-heading text-3xl text-center mt-8 text-[#8381D9] font-semibold">
        Vamos Jogar?
      </h1>
      <p className="font-body text-base text-gray-500 mt-4 text-center">
        Forneça as informações abaixo para criarmos o seu quiz
      </p>

      <form className="max-w-[340px] w-full mt-10">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full space-y-0.5">
            <Label htmlFor="bookName" className="font-body text-base text-gray-600">
              Nome do livro
            </Label>
            <Input
              type="text"
              id="bookName"
              placeholder="Digite o nome do livro"
              className="w-full"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label htmlFor="authorName" className="font-body text-base text-gray-600">
              Nome do autor
            </Label>
            <Input
              type="text"
              id="authorName"
              placeholder="Digite o nome do autor"
              className="w-full"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label
              htmlFor="quantifyOfQuestions"
              className="font-body text-base text-gray-600">
              Quantidade de perguntas
            </Label>
            <Select
              value={quantityOfQuestions}
              onValueChange={(value) => setQuantityOfQuestions(value)}
              onOpenChange={(open) => {
                timeoutRef.current = setTimeout(() => {
                  setIsOpenSelect(open);
                }, 1);
              }}>
              <SelectTrigger className="h-11" id="quantifyOfQuestions">
                <SelectValue placeholder="Selecione a quantidade de perguntas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 perguntas</SelectItem>
                <SelectItem value="10" disabled={subscriptionStatus !== 'ACTIVE'}>
                  <span>10 perguntas </span>
                  <span className="inline-flex items-center text-yellow-500">
                    (
                    <Crown size={20} className="mr-1" />
                    Premium )
                  </span>
                </SelectItem>
                <SelectItem value="15" disabled={subscriptionStatus !== 'ACTIVE'}>
                  <span>15 perguntas </span>
                  <span className="inline-flex items-center text-yellow-500">
                    (
                    <Crown size={20} className="mr-1" />
                    Premium )
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={handleCreateQuiz}
          disabled={!isFilledForm || isOpenSelect}
          className="mt-10 w-full text-[#8381D9] text-base px-4 py-[10px] font-body bg-transparent border-[2px] border-[#8381D9] tracking-wider hover:border-white hover:bg-[#8381D9] hover:text-white flex flex-row items-center gap-2 rounded-xl transition-all duration-300">
          Continuar
        </Button>
      </form>

      <Link
        href="/"
        className="mt-10 text-[#8381D9] w-fit flex items-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
        prefetch={false}>
        <MoveLeft className="w-5 h-5 pt-[3px]" />
        voltar
      </Link>
    </>
  );
};
