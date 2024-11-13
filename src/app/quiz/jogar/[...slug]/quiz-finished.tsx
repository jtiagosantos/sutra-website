import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { useQuizEngine } from "@/hooks/use-quiz-engine";
import { Gamepad2, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC } from "react";

type QuizFinishedProps = {
  executeOnMount: () => void;
}

export const QuizFinished: FC<QuizFinishedProps> = ({ executeOnMount }) => {
  const { numberOfQuestions, numberOfCorrectAnswers, resetEngine } = useQuizEngine();
  const pathname = usePathname();

  const handlePlayAgain = () => {
    executeOnMount();
    resetEngine();
  }

  const handleShareQuiz = () => {
    const [bookName, quizId] = pathname.replace('/quiz/jogar/', '').split('--');

    navigator.share({
      title: 'Sutra',
      text: 'Junte-se a mim e descubra o quanto você conhece sobre seus livros favoritos!',
      url: `${window.location.origin}/quiz/${bookName}--${quizId}`,
    });
  };

  return (
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
  );
}