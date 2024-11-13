'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  id: z.string(),
  timesPlayed: z.number(),
});

export const updateQuizTimesPlayedAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id, timesPlayed } }) => {
    await prisma.newQuiz.update({
      where: {
        id,
      },
      data: {
        timesPlayed,
      },
    });
  });
