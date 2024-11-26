'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  id: z.string(),
  book: z.object({
    title: z.string(),
    author: z.string(),
  }),
  questions: z.array(
    z.object({
      title: z.string(),
      answers: z.array(
        z.object({
          id: z.string(),
          text: z.string(),
        }),
      ),
      correct: z.string(),
    }),
  ),
});

export const saveQuizAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id, book, questions } }) => {
    const registeredQuiz = await prisma.quiz.create({
      data: {
        book: {
          title: book.title.trim(),
          author: book.author.trim(),
          cover: '',
        },
        questions,
        status: 'IN_ANALYSIS',
        summary: '',
        deletedAt: null,
        timesPlayed: 1,
        userId: id,
      },
    });

    return {
      code: 202,
      registeredQuiz,
    };
  });
