export type Quiz = {
  questions: {
    title: string;
    answers: {
      id: string;
      text: string;
    }[];
    correct: string;
  }[];
}