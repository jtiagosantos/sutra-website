'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  tags: z.array(z.string()).optional(),
  page: z.number().optional().default(1),
  take: z.number().optional().default(10),
});

export const searchQuizzesAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { tags, page, take } }) => {
    let where = {
      deletedAt: null,
    } as Record<string, unknown>;

    if (tags) {
      where = {
        ...where,
        tags: {
          hasEvery: [...tags],
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
        createdAt: 'desc',
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
