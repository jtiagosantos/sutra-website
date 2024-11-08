import { QuizContext } from "@/contexts/quiz-context";
import { useContext } from "react";

export const useQuiz = () => {
  const user = useContext(QuizContext);

  if (!user) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }

  return user;
}