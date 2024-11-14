'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string(),
  customerId: z.string(),
});

export const registerUserAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, firstName, lastName, avatar, customerId } }) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        code: 409,
      };
    }

    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        avatar,
        customerId,
        subscription: {
          status: 'INACTIVE',
        },
        preferences: {
          active_daily_reminder: true,
          accept_terms_and_policy: true,
        }
      },
    });

    return {
      code: 202,
    };
  });
