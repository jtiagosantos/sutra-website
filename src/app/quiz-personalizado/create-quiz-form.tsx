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
import { Crown } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { CreateQuizError } from './create-quiz-error';
import { CreateQuizSuccess } from './create-quiz-success';
import { Book } from '@/types/book';
import { BackButton } from '@/components/back-button';

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

    onSubmit();

    const promises = [];

    try {
      if (quantityOfQuestions === '5') {
        promises.push(
          fetch(`${window.location.origin}/api/ai/create-quiz`, {
            method: 'POST',
            body: JSON.stringify({
              bookName,
              authorName,
              quantityOfQuestions: 5,
            }),
          }),
        );
      } else if (quantityOfQuestions === '10') {
        promises.push(
          fetch(`${window.location.origin}/api/ai/create-quiz`, {
            method: 'POST',
            body: JSON.stringify({
              bookName,
              authorName,
              quantityOfQuestions: 5,
            }),
          }),
        );
        promises.push(
          fetch(`${window.location.origin}/api/ai/create-quiz`, {
            method: 'POST',
            body: JSON.stringify({
              bookName,
              authorName,
              quantityOfQuestions: 5,
            }),
          }),
        );
      } else if (quantityOfQuestions === '15') {
        promises.push(
          fetch(`${window.location.origin}/api/ai/create-quiz`, {
            method: 'POST',
            body: JSON.stringify({
              bookName,
              authorName,
              quantityOfQuestions: 5,
            }),
          }),
        );
        promises.push(
          fetch(`${window.location.origin}/api/ai/create-quiz`, {
            method: 'POST',
            body: JSON.stringify({
              bookName,
              authorName,
              quantityOfQuestions: 5,
            }),
          }),
        );
        promises.push(
          fetch(`${window.location.origin}/api/ai/create-quiz`, {
            method: 'POST',
            body: JSON.stringify({
              bookName,
              authorName,
              quantityOfQuestions: 5,
            }),
          }),
        );
      }

      const [rawBatch1, rawBatch2, rawBatch3] = await Promise.all([...promises]);

      const batch1 = await rawBatch1?.json();
      const batch2 = await rawBatch2?.json();
      const batch3 = await rawBatch3?.json();

      if (quantityOfQuestions === '5' && !batch1?.data) {
        setCreateQuizStatus('ERROR');
        return;
      } else if (quantityOfQuestions === '10' && (!batch1?.data || !batch2?.data)) {
        setCreateQuizStatus('ERROR');
        return;
      } else if (
        quantityOfQuestions === '15' &&
        (!batch1?.data || !batch2?.data || !batch3?.data)
      ) {
        setCreateQuizStatus('ERROR');
        return;
      }

      setCreateQuizStatus('SUCCESS');

      const result: Question[] = [
        ...batch1?.data?.questions,
        ...(batch2?.data?.questions ?? []),
        ...(batch3?.data?.questions ?? []),
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

      <BackButton />
    </>
  );
};
