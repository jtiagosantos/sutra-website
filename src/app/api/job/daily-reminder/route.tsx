import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import Email from '@/email/daily-reminder';
import { getDailyReminderTexts } from "@/helpers/get-daily-reminder-texts";
import { prisma } from "@/lib/prisma";

export const POST = async () => {
  try {
    const { subject, firstText, secondText, thirdText } = getDailyReminderTexts();

    const users = await prisma.user.findMany({
      where: {
        preferences: {
          not: {
            active_daily_remainder: false,
          },
        }
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      }
    });

    const { data, error } = await resend.batch.send(
      users.map((user) => ({
        from: 'Sutra <contato@sutra.app.br>',
        to: [user.email],
        subject,
        react: <Email
          userName={`${user.firstName} ${user.lastName}`}
          quizLink="https://sutra.app.br/quiz-personalizado"
          firstText={firstText}
          secondText={secondText}
          thirdText={thirdText}
          unsubscribeLink="https://sutra.app.br?lembrete-diario=true"
        />
      }))
    );

    if (error) {
      return NextResponse.json({ error, message: 'Daily reminder failed' }, { status: 500 })
    }

    return NextResponse.json({ data, message: 'Daily reminder sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, message: 'Daily reminder failed' }, { status: 500 })
  }
}