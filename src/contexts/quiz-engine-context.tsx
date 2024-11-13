import { assignMedalToUserAction } from "@/actions/assign-medal-to-user-action";
import { quizDoneAction } from "@/actions/quiz-done-action";
import { saveQuizAction } from "@/actions/save-quiz-action";
import { saveQuizInHistoryAction } from "@/actions/save-quiz-in-history-action";
import { updateQuizTimesPlayedAction } from "@/actions/update-quiz-times-played-action";
import { useUser } from "@/hooks/use-user";
import { Question } from "@/types/quiz";
import { createContext, FC, PropsWithChildren, useCallback, useRef, useState } from "react";

const FULL_PROGRESS_BAR = 100;

type QuizStatus = 'RUNNING' | 'FINISHED';

type AnswerStatus = 'CORRECT' | 'INCORRECT';

type CurrentQuizGame = {
  id: string;
  book: {
    title: string;
    author: string;
    cover: string;
  };
  questions: Question[];
  timesPlayed: number;
  isNewQuiz: boolean;
}

type QuizEngineContextProps = {
  currentQuizGame: CurrentQuizGame | null;
  questionIndex: number;
  numberOfQuestions: number;
  progress: number;
  isLastQuestion: boolean;
  currentQuestion: Question;
  currentCorrectAnswer: string;
  quizStatus: QuizStatus;
  selectedAnswerId: string | null;
  disableAnwsers: boolean;
  answerStatus: AnswerStatus | null;
  level: number;
  isOpenLevelUpModal: boolean;
  numberOfCorrectAnswers: number;
  isCalculatingAnswers: boolean;
  setSelectedAnswerId: (answerId: string | null) => void;
  setCurrentQuizGame: (quiz: CurrentQuizGame) => void;
  checkAnswer: (answerId: string) => void;
  goToNextQuestion: () => void;
  finishQuiz: () => Promise<void>;
  closeLevelUpModal: () => void;
  resetEngine: () => void;
}

export const QuizEngineContext = createContext<QuizEngineContextProps>({
  currentQuizGame: null,
  questionIndex: 1,
  numberOfQuestions: 0,
  progress: 1,
  isLastQuestion: false,
  currentQuestion: {} as Question,
  currentCorrectAnswer: '',
  quizStatus: 'RUNNING',
  selectedAnswerId: null,
  disableAnwsers: false,
  answerStatus: null,
  level: 0,
  isOpenLevelUpModal: false,
  numberOfCorrectAnswers: 0,
  isCalculatingAnswers: false,
  setCurrentQuizGame: () => null,
  setSelectedAnswerId: () => null,
  checkAnswer: () => null,
  goToNextQuestion: () => null,
  finishQuiz: () => Promise.resolve(),
  closeLevelUpModal: () => null,
  resetEngine: () => null,
});

export const QuizEngineProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { user } = useUser();

  const [currentQuizGame, setCurrentQuizGame] = useState<CurrentQuizGame | null>(null);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('RUNNING');
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [disableAnwsers, setDisableAnswers] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus | null>(null);
  const [isCalculatingAnswers, setIsCalculatingAnswers] = useState(false);
  const [level, setLevel] = useState(0);
  const [isOpenLevelUpModal, setIsOpenLevelUpModal] = useState(false);

  const numberOfCorrectAnswers = useRef(0);

  const numberOfQuestions = currentQuizGame?.questions?.length!;
  const progress = questionIndex * (FULL_PROGRESS_BAR / numberOfQuestions);
  const isLastQuestion = questionIndex === numberOfQuestions;
  const currentQuestion = currentQuizGame?.questions?.[questionIndex - 1]!;
  const currentCorrectAnswer = currentQuestion?.answers.find((answer) => answer.id === currentQuestion.correct)?.text!;

  const checkAnswer = useCallback((answerId: string) => {
    if (currentQuestion!.correct === answerId) {
      numberOfCorrectAnswers.current++;
      setAnswerStatus('CORRECT');
    } else {
      setAnswerStatus('INCORRECT');
    }
  }, [numberOfCorrectAnswers, currentQuestion]);

  const goToNextQuestion = useCallback(() => {
    setQuestionIndex((state) => state + 1);
    setSelectedAnswerId(null);
    setAnswerStatus(null);
    setDisableAnswers(false);
  }, []);

  const finishQuiz = useCallback(async () => {
    try {
      setIsCalculatingAnswers(true);

      await saveQuizInHistoryAction({
        id: user!.id,
        numberOfCorrect: numberOfCorrectAnswers.current,
        numberOfIncorrect: numberOfQuestions - numberOfCorrectAnswers.current,
      });

      const result = await quizDoneAction({
        id: user!.id,
        score: numberOfCorrectAnswers.current,
      });

      if (!currentQuizGame?.isNewQuiz) {
        await updateQuizTimesPlayedAction({
          id: currentQuizGame!.id,
          timesPlayed: currentQuizGame!.timesPlayed + 1,
        });
      }

      if (result?.data?.leveledUp) {
        setIsOpenLevelUpModal(true);
        setLevel(result.data.level);
      }

      await assignMedalToUserAction({
        id: user!.id,
        level: result?.data?.level!,
      });

      setQuizStatus('FINISHED');
    } finally {
      setIsCalculatingAnswers(false);
    }
  }, [numberOfCorrectAnswers, numberOfQuestions, user, currentQuizGame]);

  const closeLevelUpModal = useCallback(() => {
    setIsOpenLevelUpModal(false);
  }, []);

  const resetEngine = useCallback(() => {
    setQuestionIndex(1);
    setQuizStatus('RUNNING');
    setSelectedAnswerId(null);
    setDisableAnswers(false);
    setAnswerStatus(null);
    setLevel(0);
    setIsCalculatingAnswers(false);
    numberOfCorrectAnswers.current = 0;
  }, []);

  return (
    <QuizEngineContext.Provider value={{
      currentQuizGame,
      questionIndex,
      numberOfQuestions,
      progress,
      isLastQuestion,
      currentQuestion,
      currentCorrectAnswer,
      quizStatus,
      selectedAnswerId,
      disableAnwsers,
      answerStatus,
      level,
      isOpenLevelUpModal,
      numberOfCorrectAnswers: numberOfCorrectAnswers.current,
      isCalculatingAnswers,
      setCurrentQuizGame,
      setSelectedAnswerId,
      checkAnswer,
      goToNextQuestion,
      finishQuiz,
      closeLevelUpModal,
      resetEngine,
    }}>
      {children}
    </QuizEngineContext.Provider>
  );
}