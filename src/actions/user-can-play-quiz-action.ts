'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

const schema = z.object({
  email: z.string().email(),
});

export const userCanPlayQuizAction = actionClient
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
          email,
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

    const limitOfQuizzesPerDay = user.subscription.status === 'ACTIVE' ? 10 : 1;

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
