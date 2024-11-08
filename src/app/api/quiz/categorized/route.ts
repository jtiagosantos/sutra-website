import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Quiz = {
  id: string;
  book: {
    title: string;
    author: string;
    cover: string;
  };
}

type QuizByCategory = Record<string, {
  name: string;
  quizzes: Quiz[];
}>;

export const revalidate = 60 * 60 * 12; // 12 hours

export const GET = async () => {
  const categories = await prisma.quizCategory.findMany();

  const queries = [];
  const quizzesByCategory = {} as QuizByCategory;

  for (const category of categories) {
    const query = prisma.newQuiz.findMany({
      where: {
        deletedAt: null,
        categories: {
          hasSome: [category.value],
        },
      },
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        book: true,
        categories: true,
      }
    });

    queries.push(query);
  }

  const quizzes = await Promise.all(queries);

  for (let i = 0; i < categories.length; i++) {
    const hasSomeQuiz = quizzes[i].length > 0;

    if (hasSomeQuiz) {
      quizzesByCategory[categories[i].value] = {
        name: categories[i].name,
        quizzes: quizzes[i],
      };
    }
  }

  return NextResponse.json({ quizzes: quizzesByCategory });
}