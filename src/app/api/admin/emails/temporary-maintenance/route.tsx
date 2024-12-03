import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import Email from '@/email/temporary-maintenance';
import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/helpers/admin-middleware";

export const POST = async (request: NextRequest) => adminMiddleware(request, async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    const { data, error } = await resend.batch.send(
      users.map((user) => ({
        from: 'Sutra <contato@sutra.app.br>',
        to: [user.email],
        subject: '⚠️ Manutenção Temporária ⚠️',
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
});