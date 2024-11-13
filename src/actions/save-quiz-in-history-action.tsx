'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  id: z.string(),
  numberOfCorrect: z.number(),
  numberOfIncorrect: z.number(),
});

export const saveQuizInHistoryAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id, numberOfCorrect, numberOfIncorrect } }) => {
    await prisma.quizHistory.create({
      data: {
        numberOfCorrect,
        numberOfIncorrect,
        numberOfQuestions: numberOfCorrect + numberOfIncorrect,
        userId: id,
      }
    });

    return {
      code: 202,
    };
  });
