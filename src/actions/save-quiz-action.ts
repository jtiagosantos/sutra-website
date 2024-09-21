'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  email: z.string().email(),
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
  .action(async ({ parsedInput: { email, book, questions } }) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        code: 404,
      };
    }

    await prisma.quiz.create({
      data: {
        book,
        questions,
        userId: user.id,
      },
    });

    return {
      code: 202,
    };
  });
