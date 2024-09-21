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
import { Quiz } from '@/types/quiz';
import { Crown, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
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
  const [quantifyOfQuestions, setQuantifyOfQuestions] = useState('');

  const isFilledForm = !!bookName && !!authorName && !!quantifyOfQuestions;

  const handleCreateQuiz = async () => {
    if (!isFilledForm) {
      alert('Preencha todos os campos');
      return;
    }

    if (subscriptionStatus !== 'ACTIVE' && Number(quantifyOfQuestions) > 5) {
      alert(
        'Você precisa ser usuário premium para criar quizzes com mais de 5 perguntas',
      );
      return;
    }

    onSubmit();

    const result = await createQuizAction({
      bookName,
      authorName,
      quantifyOfQuestions: Number(quantifyOfQuestions),
    });

    if (!result?.data) {
      setCreateQuizStatus('ERROR');
      return;
    }

    if (result.data.code === 500) {
      setCreateQuizStatus('ERROR');
      return;
    }

    setCreateQuizStatus('SUCCESS');
    setQuiz(result.data.quiz);
    setBook({ title: bookName, author: authorName });
    onCreateQuiz();
  };

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
      <p className="font-body text-base text-gray-500 mt-4">
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
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label
              htmlFor="quantifyOfQuestions"
              className="font-body text-base text-gray-600">
              Quantidade de perguntas
            </Label>
            <Select
              value={quantifyOfQuestions}
              onValueChange={(value) => setQuantifyOfQuestions(value)}>
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
          disabled={!isFilledForm}
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
