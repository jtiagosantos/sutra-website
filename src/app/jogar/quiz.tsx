'use client';

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MoveLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { CalculationAnswersLoading } from "./calculation-answers-loading";

const FULL_PROGRESS_BAR = 100;
const ONE_SECOND = 1000;

const questions = [
  {
    "title": "Qual é o significado da rosa para o Pequeno Príncipe?",
    "answers": [
      {
        "id": "cl7sf8ljr0000zqf8h9krrw8v",
        "text": "A rosa representa a vaidade e a superficialidade."
      },
      {
        "id": "cl7sf8ljr0001zqf8erqvw0w",
        "text": "A rosa é um símbolo de amor e cuidado, representando a importância de relacionamentos únicos e dedicados."
      },
      {
        "id": "cl7sf8ljr0002zqf8k9rcn4p",
        "text": "A rosa simboliza a riqueza material e a busca por posses."
      },
      {
        "id": "cl7sf8ljr0003zqf8pl4t5d1",
        "text": "A rosa representa a fragilidade e a brevidade da vida."
      }
    ],
    "correct": "cl7sf8ljr0001zqf8erqvw0w"
  },
  {
    "title": "Como a figura do aviador contribui para a compreensão da história do Pequeno Príncipe?",
    "answers": [
      {
        "id": "cl7sf8ljr0004zqf8klo1mv8",
        "text": "O aviador serve como um contraponto adulto à perspectiva infantil do Pequeno Príncipe, oferecendo uma visão mais realista das experiências do príncipe."
      },
      {
        "id": "cl7sf8ljr0005zqf8h0wz95c",
        "text": "O aviador simboliza a solidão e a busca por significado em um mundo que frequentemente ignora a beleza do simples e do pequeno."
      },
      {
        "id": "cl7sf8ljr0006zqf8m5hpx4g",
        "text": "O aviador é uma representação do próprio autor, ajudando a conectar a narrativa pessoal de Saint-Exupéry com a história do Pequeno Príncipe."
      },
      {
        "id": "cl7sf8ljr0007zqf8u8w1g76",
        "text": "O aviador é uma figura que reflete a sabedoria e a experiência do mundo adulto, contrastando com a inocência do Pequeno Príncipe."
      }
    ],
    "correct": "cl7sf8ljr0006zqf8m5hpx4g"
  },
  {
    "title": "Qual é a importância dos personagens que o Pequeno Príncipe encontra em seus diferentes planetas?",
    "answers": [
      {
        "id": "cl7sf8ljr0008zqf8j5v7l8x",
        "text": "Cada personagem representa um tipo diferente de comportamento ou atitude humana, oferecendo críticas sobre a natureza humana e a sociedade."
      },
      {
        "id": "cl7sf8ljr0009zqf8o3np8qf",
        "text": "Os personagens ajudam o Pequeno Príncipe a aprender sobre a responsabilidade e o amor através de suas próprias falhas e virtudes."
      },
      {
        "id": "cl7sf8ljr000azqf8y2n4k2d",
        "text": "Cada personagem é um reflexo dos desafios e das conquistas que o Pequeno Príncipe enfrentará em sua jornada de crescimento pessoal."
      },
      {
        "id": "cl7sf8ljr000bzqf8i7r1d9e",
        "text": "Os personagens simbolizam diferentes aspectos da natureza humana e ajudam o Pequeno Príncipe a compreender melhor a complexidade dos relacionamentos humanos."
      }
    ],
    "correct": "cl7sf8ljr0008zqf8j5v7l8x"
  },
  {
    "title": "Por que o Pequeno Príncipe decide deixar seu planeta e viajar para outros planetas?",
    "answers": [
      {
        "id": "cl7sf8ljr000czqf8l8d6t0p",
        "text": "Ele deixa seu planeta em busca de novas experiências e para entender melhor a natureza dos outros seres."
      },
      {
        "id": "cl7sf8ljr000dzqf8m5x7g0e",
        "text": "O Pequeno Príncipe busca encontrar uma maneira de retornar à sua rosa, acreditando que viajar lhe dará a sabedoria necessária."
      },
      {
        "id": "cl7sf8ljr000ezqf8n9k3p7x",
        "text": "Ele decide viajar para fugir das responsabilidades e dos problemas que enfrenta em seu próprio planeta."
      },
      {
        "id": "cl7sf8ljr000fzqf8p1r6s9w",
        "text": "O Pequeno Príncipe quer encontrar um lugar onde ele possa ser valorizado e amado, diferente do que sente em seu planeta natal."
      }
    ],
    "correct": "cl7sf8ljr000dzqf8m5x7g0e"
  },
  {
    "title": "O que a história do Pequeno Príncipe nos ensina sobre a percepção da infância e da idade adulta?",
    "answers": [
      {
        "id": "cl7sf8ljr000gzqf8v9n2q3m",
        "text": "A história sugere que a infância é uma fase de pureza e verdade que a idade adulta frequentemente perde, mostrando a importância de manter a perspectiva infantil."
      },
      {
        "id": "cl7sf8ljr000hzqf8w1k8r2x",
        "text": "A narrativa enfatiza que a idade adulta é mais prática e menos preocupada com as emoções e os relacionamentos profundos."
      },
      {
        "id": "cl7sf8ljr000izqf8y5w6l1v",
        "text": "A história mostra que a infância é uma fase de fantasia e imaginação que a idade adulta deveria tentar recuperar para encontrar a verdadeira felicidade."
      },
      {
        "id": "cl7sf8ljr000jzqf8r2m5t3b",
        "text": "A visão da infância como um período de desilusão e incerteza contrasta com a clareza e a estabilidade percebidas na idade adulta."
      }
    ],
    "correct": "cl7sf8ljr000gzqf8v9n2q3m"
  }
]

export const Quiz = () => {
  const { toast, dismiss } = useToast();
  const [questionIndex, setQuestionIndex] = useState(1);
  const [areAnswersDisabled, setAreAnswersDisabled] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isCalculatingAnswers, setIsCalculatingAnswers] = useState(false);
  const totalCorrectAnswers = useRef(0);

  const totalQuestions = 5;
  const progress = questionIndex * (FULL_PROGRESS_BAR / totalQuestions);
  const isLastQuestion = questionIndex === totalQuestions;
  const question = questions[questionIndex - 1];

  const handleQuizDone = async () => {
    try {
      setIsCalculatingAnswers(true);

      //TODO: update user score
      //TODO: count +1 to user's quiz played today
    } finally {
      setIsCalculatingAnswers(false);
    }
  };

  const handleAnswerQuestion = async (answerId: string) => {
    setAreAnswersDisabled(true);

    let toastRef: { id: string };

    if (question.correct === answerId) {
      totalCorrectAnswers.current++;
      toastRef = toast({
        title: 'Resposta Certa!',
        variant: 'success',
      });
    } else {
      toastRef = toast({
        title: 'Resposta Errada!',
        variant: 'destructive',
      });
    }

    await new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        dismiss(toastRef.id);

        if (!isLastQuestion) {
          setQuestionIndex((state) => state + 1);
        }
        setAreAnswersDisabled(false);

        resolve(timeoutId);
      }, ONE_SECOND);
    }).then((timeoutId) => {
      clearTimeout(timeoutId as NodeJS.Timeout);
    });

    if (isLastQuestion) {
      await handleQuizDone();
      setIsQuizFinished(true);
    }
  };

  return (
    <div className="max-w-[600px] w-full mx-auto">
      {!isQuizFinished && (
        <>
          <div className="flex flex-col items-center gap-2">
            <p className="font-body font-semibold text-[18px] text-gray-500">
              {questionIndex} / {totalQuestions}
            </p>
            <Progress value={progress} className="w-full bg-gray-200" />
          </div>

          <h2 className="w-full text-center mt-8 font-body text-[18px] text-gray-600 font-medium leading-7">
            {question.title}
          </h2>

          <div className="w-full flex flex-col gap-3 mt-6">
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerQuestion(answer.id)}
                disabled={areAnswersDisabled}
                className="bg-[#50B2C0] p-[10px] rounded-md text-white font-body font-normal text-[18px] text-left hover:scale-110 transition-all duration-300">
                {answer.text}
              </button>
            ))}
          </div>
        </>
      )}

      {isQuizFinished && (
        <>
          <div className="w-full flex items-center gap-4 max-[430px]:flex-col">
            <div className="w-full bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 p-4 py-6 flex flex-col items-center gap-2">
              <span className="text-2xl">🤩</span>
              <span className="font-body font-semibold text-xl text-gray-600">
                {totalQuestions}
              </span>
              <span className="font-body font-normal text-base text-gray-600">
                Perguntas no Total
              </span>
            </div>
            <div className="w-full bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 p-4 py-6 flex flex-col items-center gap-2">
              <span className="text-2xl">😎</span>
              <span className="font-body font-semibold text-xl text-gray-600">
                {totalCorrectAnswers.current}
              </span>
              <span className="font-body font-normal text-base text-gray-600">
                Respostas Corretas
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button className="mt-6 text-white w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0]">
              <Share2 size={24} />
              Compartilhar resultado
            </Button>
          </div>
        </>
      )}

      {isCalculatingAnswers && <CalculationAnswersLoading />}

      <Link
        href="/"
        className="mt-10 text-[#8381D9] w-full flex items-center justify-center gap-[6px] font-heading font-medium text-[18px] hover:underline hover:text-accent underline-offset-4"
        prefetch={false}
      >
        <MoveLeft className="w-5 h-5 pt-[3px]" />
        Sair do quiz
      </Link>
    </div>
  );
}