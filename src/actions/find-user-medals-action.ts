'use server';

import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export const findUserMedalsAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        code: 404,
      };
    }

    const userMedals = await prisma.userMedal.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      userMedals,
    };
  });
