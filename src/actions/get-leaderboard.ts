'use server';

import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

export const getLeaderboardAction = actionClient.action(async () => {
  const leaderboard = await prisma.user.findMany({
    where: {
      score: {
        gt: 0,
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatar: true,
      score: true,
    },
    orderBy: {
      score: 'desc',
    },
    take: 10,
  });

  return {
    leaderboard,
  };
});
