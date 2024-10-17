'use server';

import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

export const findMedalsAction = actionClient.action(async () => {
  const medals = await prisma.medal.findMany({
    orderBy: {
      levelRequired: 'asc',
    },
  });

  return {
    medals,
  };
});
