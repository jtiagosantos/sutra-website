'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  id: z.string(),
});

export const getQuizAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const quiz = await prisma.newQuiz.findUnique({
      where: {
        id,
      },
    });

    return {
      quiz,
    };
  });
