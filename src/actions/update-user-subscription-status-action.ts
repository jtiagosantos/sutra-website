'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  customerId: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'CANCELED']),
});

export const updateUserSubscriptionStatusAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { customerId, status } }) => {
    const user = await prisma.user.findUnique({
      where: {
        customerId,
      },
    });

    if (!user) {
      return {
        code: 404,
      };
    }

    const userData = await prisma.user.update({
      where: {
        customerId,
      },
      data: {
        subscription: {
          status,
        },
      },
    });

    return {
      code: 200,
      user: userData
    };
  });
