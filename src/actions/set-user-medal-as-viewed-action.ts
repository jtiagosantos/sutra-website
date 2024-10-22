'use server';

import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

export const setUserMedalAsViewedAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const userMedal = await prisma.userMedal.findUnique({
      where: {
        id,
      },
    });

    if (!userMedal) {
      return {
        code: 404
      }
    }

    if (!!userMedal.viewedAt) {
      return {
        code: 200,
      };
    }

    await prisma.userMedal.update({
      where: {
        id,
      },
      data: {
        viewedAt: new Date(),
      },
    });

    return {
      code: 204,
    };
  });
