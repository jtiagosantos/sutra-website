import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export const POST = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Book Quiz <onboarding@resend.dev>',
      to: ['tiagosan040@gmail.com'],
      subject: 'Hello world',
      html: '<h1>Hello world</h1>',
    });

    if (error) {
      return NextResponse.json({ error, message: 'Daily remainder failed' }, { status: 500 })
    }

    return NextResponse.json({ data, message: 'Daily remainder sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, message: 'Daily remainder failed' }, { status: 500 })
  }
}