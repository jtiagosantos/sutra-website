import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const quizzes = await prisma.quiz.findMany({
    where: {
      status: 'DONE',
      deletedAt: null,
    },
    orderBy: {
      timesPlayed: 'desc',
    },
    take: 10,
    select: {
      id: true,
      book: true,
    }
  });

  return NextResponse.json({ quizzes })
}