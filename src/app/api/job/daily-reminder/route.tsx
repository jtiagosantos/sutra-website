import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import Email from '@/email/daily-remainder';
import { getDailyRemainderTexts } from "@/helpers/get-daily-remainder-texts";
import { prisma } from "@/lib/prisma";

export const POST = async () => {
  try {
    const { subject, firstText, secondText, thirdText } = getDailyRemainderTexts();

    const users = await prisma.user.findMany({
      where: {
        preferences: {
          equals: {
            active_daily_reminder: true,
          }
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
        from: 'Book Quiz <onboarding@resend.dev>',
        to: [user.email],
        subject,
        react: <Email
          userName={`${user.firstName} ${user.lastName}`}
          quizLink="https://www.bookquiz.com.br/jogar"
          firstText={firstText}
          secondText={secondText}
          thirdText={thirdText}
        />
      }))
    );

    if (error) {
      return NextResponse.json({ error, message: 'Daily remainder failed' }, { status: 500 })
    }

    return NextResponse.json({ data, message: 'Daily remainder sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, message: 'Daily remainder failed' }, { status: 500 })
  }
}