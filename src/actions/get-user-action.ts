'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  email: z.string().email(),
});

export const getUserAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        user: null,
        code: 404,
      };
    }

    return {
      user,
      code: 200,
    };
  });
