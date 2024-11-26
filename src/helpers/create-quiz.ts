type CreateQuizProps = {
  bookName: string;
  authorName: string;
  quantityOfQuestions: number;
}

export const createQuiz = async ({ bookName, authorName, quantityOfQuestions }: CreateQuizProps) => {
  return fetch(`${window.location.origin}/api/ai/create-quiz`, {
    method: 'POST',
    body: JSON.stringify({
      bookName,
      authorName,
      quantityOfQuestions,
    }),
  });
}