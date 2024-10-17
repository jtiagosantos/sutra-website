'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { resend } from "@/lib/resend";
import Email from "@/email/medal-won"
import dayjs from 'dayjs';

const schema = z.object({
  email: z.string().email(),
  level: z.number(),
});

export const assignMedalToUserAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, level } }) => {
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

    const medal = await prisma.medal.findUnique({
      where: {
        levelRequired: level,
      },
    });

    if (!medal) {
      return {
        code: 404,
      };
    }

    const userMedal = await prisma.userMedal.findFirst({
      where: {
        medalId: medal.id,
        userId: user.id
      },
    });

    if (userMedal) {
      return {
        code: 200,
      };
    }

    const registeredMedal = await prisma.userMedal.create({
      data: {
        medalId: medal.id,
        userId: user.id,
      },
    });

    await resend.emails.send({
      from: 'Book Quiz <app@bookquiz.com.br>',
      to: [user.email],
      subject: `Parabéns! Você ganhou a medalha ${medal.name} 🎉`,
      react: <Email
        userName={`${user.firstName} ${user.lastName}`}
        medalName={medal.name}
        medalDescription={`Você alcançou o nível ${level} e ganhou a medalha ${medal.name}`}
        medalImageUrl={medal.image}
        earnedDate={dayjs(registeredMedal.createdAt).format('DD/MM/YYYY')}
        baseUrl='https://www.bookquiz.com.br/medalhas'
      />
    });

    return {
      code: 201,
    };
  });
