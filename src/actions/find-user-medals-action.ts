'use server';

import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

export const findUserMedalsAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const userMedals = await prisma.userMedal.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      userMedals,
    };
  });
