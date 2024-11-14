'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  id: z.string(),
  preferences: z.object({
    active_daily_reminder: z.boolean().optional(),
    accept_terms_and_policy: z.boolean().optional(),
  }),
});

export const updateUserPreferencesAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id, preferences } }) => {
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

    await prisma.user.update({
      where: {
        email: user.email,
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