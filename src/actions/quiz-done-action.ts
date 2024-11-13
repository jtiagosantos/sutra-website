'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

const SCORES_TO_INCREMENT_LEVEL = 20;

const schema = z.object({
  id: z.string(),
  score: z.number(),
});

export const quizDoneAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id, score } }) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        code: 404,
      };
    }

    let level = user.level;
    let leveledUp = false;

    if ((user.score + score) >= (level + 1) * SCORES_TO_INCREMENT_LEVEL) {
      level = level + 1;
      leveledUp = true;
    }

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        score: {
          increment: score,
        },
        level,
        dailyQuizCount: {
          increment: 1,
        },
        lastQuizPlayedAt: dayjs().toDate(),
      },
    });

    return {
      code: 200,
      leveledUp,
      level,
    };
  });
