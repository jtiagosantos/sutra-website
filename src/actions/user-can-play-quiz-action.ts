'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

const schema = z.object({
  id: z.string(),
});

export const userCanPlayQuizAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        code: 404,
        canPlay: null,
        subscriptionStatus: null,
      };
    }

    if (user.lastQuizPlayedAt === null) {
      return {
        code: 200,
        canPlay: true,
        subscriptionStatus: user.subscription.status,
      };
    }

    const isLastQuizPlayedToday = dayjs(user.lastQuizPlayedAt).isToday();

    if (!isLastQuizPlayedToday) {
      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          dailyQuizCount: 0,
          lastQuizPlayedAt: dayjs().toDate(),
        },
      });

      return {
        code: 200,
        canPlay: true,
        subscriptionStatus: user.subscription.status,
      };
    }

    const limitOfQuizzesPerDay = user.subscription.status === 'ACTIVE' ? 15 : 3;

    if (user.dailyQuizCount >= limitOfQuizzesPerDay) {
      return {
        code: 200,
        canPlay: false,
        subscriptionStatus: user.subscription.status,
      };
    }

    return {
      code: 200,
      canPlay: true,
      subscriptionStatus: user.subscription.status,
    };
  });
