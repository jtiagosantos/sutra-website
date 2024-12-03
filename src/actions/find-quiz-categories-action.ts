'use server';

import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

export const findQuizCategoriesAction = actionClient
  .action(async () => {
    const categories = await prisma.quizCategory.findMany();

    return {
      categories,
    }
  });