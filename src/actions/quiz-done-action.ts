"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

const schema = z.object({
  email: z.string().email(),
  score: z.number(),
});

export const quizDoneAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, score } }) => {
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
        score: {
          increment: score,
        },
        dailyQuizCount: {
          increment: 1,
        },
        lastQuizPlayedAt: dayjs().toDate(),
      },
    });

    return {
      code: 200,
    };
  });