'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  email: z.string().email(),
  preferences: z.object({
    active_daily_reminder: z.boolean().optional(),
  }),
});

export const updateUserPreferencesAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, preferences } }) => {
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

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        preferences: {
          ...user.preferences,
          ...preferences,
        },
      },
    });

    return {
      code: 200,
    }
  });