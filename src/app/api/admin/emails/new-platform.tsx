import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import Email from '@/email/new-platform';
import { prisma } from "@/lib/prisma";

export const POST = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
      }
    });

    const { data, error } = await resend.batch.send(
      users.map((user) => ({
        from: 'Book Quiz <app@bookquiz.com.br>',
        to: [user.email],
        subject: 'Grandes Novidades na Plataforma! 😍🥳🤩',
        react: <Email
          userName={`${user.firstName} ${user.lastName}`}
        />
      }))
    );

    if (error) {
      return NextResponse.json({ error, message: 'Temporary maintenance failed' }, { status: 500 })
    }

    return NextResponse.json({ data, message: 'Temporary maintenance sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, message: 'Temporary maintenance failed' }, { status: 500 })
  }
}