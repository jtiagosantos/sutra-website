import { Progress } from "@/components/ui/progress";
import { useQuizEngine } from "@/hooks/use-quiz-engine";
import clsx from "clsx";
import { FC } from "react";

type CurrentQuestionProps = {
  marginBottom: number;
}

export const CurrentQuestion: FC<CurrentQuestionProps> = ({ marginBottom }) => {
  const {
    questionIndex,
    numberOfQuestions,
    progress,
    currentQuestion,
    selectedAnswerId,
    answerStatus,
    disableAnwsers,
    selectAnswerId,
  } = useQuizEngine();

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <p className="font-body font-semibold text-[18px] text-gray-500">
          {questionIndex} / {numberOfQuestions}
        </p>
        <Progress value={progress} className="w-full bg-gray-200" />
      </div>

      <div style={{ marginBottom: marginBottom + 150 }}>
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
                onClick={() => selectAnswerId(answer.id)}
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
  );
}