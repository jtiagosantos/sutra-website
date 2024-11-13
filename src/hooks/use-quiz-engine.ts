import { QuizEngineContext } from "@/contexts/quiz-engine-context";
import { useContext } from "react";

export const useQuizEngine = () => {
  const user = useContext(QuizEngineContext);

  if (!user) {
    throw new Error('useQuizEngine must be used within a QuizEngineProvider');
  }

  return user;
}