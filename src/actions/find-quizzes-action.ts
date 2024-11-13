'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  categories: z.array(z.string()).optional(),
  page: z.number().optional().default(1),
  take: z.number().optional().default(10),
  createdAt: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const findQuizzesAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { categories, page, take, createdAt } }) => {
    let where = {
      deletedAt: null,
      status: 'DONE',
    } as Record<string, unknown>;

    if (categories) {
      where = {
        ...where,
        categories: {
          hasSome: [...categories],
        },
      };
    }

    const quizzesCount = await prisma.newQuiz.count({
      where,
    });

    const totalPages = Math.ceil(quizzesCount / take);

    const quizzes = await prisma.newQuiz.findMany({
      where,
      select: {
        id: true,
        book: true,
      },
      take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt,
      }
    });

    const metadata = {
      next: page + 1 <= totalPages ? page + 1 : null,
    };

    return {
      quizzes,
      metadata,
    }
  });
