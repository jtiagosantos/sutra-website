import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 60 * 60 * 12; // 12 hours

export const GET = async () => {
  const quizzes = await prisma.newQuiz.findMany({
    where: {
      status: 'DONE',
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
    select: {
      id: true,
      book: true,
    }
  });

  return NextResponse.json({ quizzes })
}