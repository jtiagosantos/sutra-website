import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import Email from '@/email/daily-remainder';
import { getDailyRemainderTexts } from "@/helpers/get-daily-remainder-texts";

export const POST = async () => {
  try {
    const { subject, firstText, secondText, thirdText } = getDailyRemainderTexts();

    const { data, error } = await resend.emails.send({
      from: 'Book Quiz <onboarding@resend.dev>',
      to: ['tiagosan040@gmail.com'],
      subject,
      react: <Email
        userName="Tiago Santos"
        quizLink="https://www.bookquiz.com.br/jogar"
        firstText={firstText}
        secondText={secondText}
        thirdText={thirdText}
      />,
    });

    if (error) {
      return NextResponse.json({ error, message: 'Daily remainder failed' }, { status: 500 })
    }

    return NextResponse.json({ data, message: 'Daily remainder sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, message: 'Daily remainder failed' }, { status: 500 })
  }
}