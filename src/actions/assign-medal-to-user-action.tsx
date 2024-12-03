'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { resend } from "@/lib/resend";
import Email from "@/email/medal-won"
import dayjs from 'dayjs';

const schema = z.object({
  id: z.string(),
  level: z.number(),
});

export const assignMedalToUserAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id, level } }) => {
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
      from: 'Sutra <contato@sutra.app.br>',
      to: [user.email],
      subject: `Parabéns! Você ganhou a medalha ${medal.name} 🎉`,
      react: <Email
        userName={`${user.firstName} ${user.lastName}`}
        medalName={medal.name}
        medalDescription={`Você alcançou o nível ${level} e ganhou a medalha ${medal.name}`}
        medalImageUrl={medal.image}
        earnedDate={dayjs(registeredMedal.createdAt).format('DD/MM/YYYY')}
        baseUrl='https://www.sutra.app.br/medalhas'
      />
    });

    return {
      code: 201,
    };
  });
