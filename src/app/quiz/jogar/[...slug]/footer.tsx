import { Button } from "@/components/ui/button";
import { useQuizEngine } from "@/hooks/use-quiz-engine";
import clsx from "clsx";
import { CircleCheck, CircleX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const Footer = () => {
  const {
    selectedAnswerId,
    checkAnswer,
    answerStatus,
    currentCorrectAnswer,
    isLastQuestion,
    goToNextQuestion,
    finishQuiz,
    resetEngine,
    currentQuizGame,
  } = useQuizEngine();
  const pathname = usePathname();
  const router = useRouter();

  const handleLeaveQuiz = () => {
    if (currentQuizGame?.isNewQuiz) {
      resetEngine();
      router.push('/');
      return;
    }

    const [bookName, quizId] = pathname.replace('/quiz/jogar/', '').split('--');

    router.push(`/quiz/${bookName}--${quizId}`);

    resetEngine();
  }

  return (
    <footer className={clsx('w-full border-t-[2px] mt-10 fixed bottom-0 left-0 z-20', {
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
  );
}