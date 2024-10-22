import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/helpers/admin-middleware";

const bodySchema = z.object({
  medalId: z.string({ required_error: 'medalId is a required field' }),
  userId: z.string({ required_error: 'userId is a required field' }),
})

export const POST = async (request: NextRequest) => adminMiddleware(request, async () => {
  try {
    const body = await request.json();
    const { medalId, userId } = bodySchema.parse(body);

    const medal = await prisma.medal.findUnique({
      where: {
        id: medalId,
      },
    });

    if (!medal) {
      return NextResponse.json({ message: 'Medal not found' }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userMedal = await prisma.userMedal.findFirst({
      where: {
        medalId,
        userId
      },
    });

    if (userMedal) {
      return NextResponse.json({ message: 'User already has this medal' }, { status: 409 });
    }

    await prisma.userMedal.create({
      data: {
        medalId,
        userId,
      },
    });

    return NextResponse.json({ message: 'Medal awarded successfully' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
});
