'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  email: z.string().email(),
  numberOfCorrect: z.number(),
  numberOfIncorrect: z.number(),
});

export const saveQuizInHistoryAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, numberOfCorrect, numberOfIncorrect } }) => {
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

    await prisma.quizHistory.create({
      data: {
        numberOfCorrect,
        numberOfIncorrect,
        numberOfQuestions: numberOfCorrect + numberOfIncorrect,
        userId: user.id,
      }
    });

    return {
      code: 202,
    };
  });
