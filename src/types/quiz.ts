export type Quiz = {
  questions: Question[];
};

export type Question = {
  title: string;
  answers: {
    id: string;
    text: string;
  }[];
  correct: string;
};
