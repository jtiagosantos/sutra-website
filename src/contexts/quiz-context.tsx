import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

type Quiz = {
  id: string;
  book: {
    title: string;
    author: string;
    cover: string;
  };
}

type QuizByCategory = Record<string, {
  name: string;
  quizzes: Quiz[];
}>;

type QuizContextProps = {
  isLoadingRecentQuizzes: boolean;
  isLoadingHotQuizzes: boolean;
  isLoadingQuizzesByCategory: boolean;
  recentQuizzes: Quiz[];
  hotQuizzes: Quiz[];
  quizzesByCategory: QuizByCategory;
};

export const QuizContext = createContext<QuizContextProps>({
  isLoadingRecentQuizzes: true,
  isLoadingHotQuizzes: true,
  isLoadingQuizzesByCategory: true,
  recentQuizzes: [],
  hotQuizzes: [],
  quizzesByCategory: {},
});

export const QuizProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [isLoadingRecentQuizzes, setIsLoadingRecentQuizzes] = useState(true);
  const [isLoadingHotQuizzes, setIsLoadingHotQuizzes] = useState(true);
  const [isLoadingQuizzesByCategory, setIsLoadingQuizzesByCategory] = useState(true);
  const [recentQuizzes, setRecentQuizzes] = useState<Quiz[]>([]);
  const [hotQuizzes, setHotQuizzes] = useState<Quiz[]>([]);
  const [quizzesByCategory, setQuizzesByCategory] = useState<QuizByCategory>({});

  const handleLoadRecentQuizzes = useCallback(async () => {
    const response = await fetch(`${window.location.origin}/api/quiz/recent`);
    const { quizzes } = await response.json();

    setRecentQuizzes(quizzes);
  }, []);

  const handleLoadHotQuizzes = useCallback(async () => {
    const response = await fetch(`${window.location.origin}/api/quiz/hot`, {
      cache: 'no-store',
    });
    const { quizzes } = await response.json();

    setHotQuizzes(quizzes);
  }, []);

  const handleLoadQuizzesByCategory = useCallback(async () => {
    const response = await fetch(`${window.location.origin}/api/quiz/categorized`);
    const { quizzes } = await response.json();

    setQuizzesByCategory(quizzes);
  }, []);

  useEffect(() => {
    handleLoadRecentQuizzes().then(() => setIsLoadingRecentQuizzes(false));
    handleLoadHotQuizzes().then(() => setIsLoadingHotQuizzes(false));
    handleLoadQuizzesByCategory().then(() => setIsLoadingQuizzesByCategory(false));
  }, []);

  return (
    <QuizContext.Provider value={{
      isLoadingRecentQuizzes,
      isLoadingHotQuizzes,
      isLoadingQuizzesByCategory,
      recentQuizzes,
      hotQuizzes,
      quizzesByCategory,
    }}>
      {children}
    </QuizContext.Provider>
  );
}