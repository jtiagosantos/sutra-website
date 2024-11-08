'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  categories: z.array(z.string()).optional(),
  take: z.number().optional().default(10),
});

export const findQuizzesAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { categories, take } }) => {
    let where = {
      deletedAt: null,
    } as Record<string, unknown>;

    if (categories) {
      where = {
        ...where,
        categories: {
          hasSome: [...categories]
        }
      };
    }

    const quizzes = await prisma.newQuiz.findMany({
      where,
      select: {
        id: true,
        book: true,
      },
      take,
      orderBy: {
        createdAt: 'desc',
      }
    });

    return {
      quizzes,
    }
  });
