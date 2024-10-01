import { openai } from '@/lib/openai';
import { NextRequest, NextResponse } from 'next/server';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';

const bodySchema = z.object({
  quantityOfQuestions: z.number(),
  bookName: z.string(),
  authorName: z.string(),
}).transform((data) => ({
  quantityOfQuestions: data.quantityOfQuestions,
  bookName: data.bookName.trim(),
  authorName: data.authorName.trim(),
}));

const outputSchema = z.object({
  questions: z.array(
    z.object({
      title: z.string(),
      answers: z.array(
        z.object({
          id: z.string(),
          text: z.string(),
        }),
      ),
      correct: z.string(),
    }),
  ),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { quantityOfQuestions, bookName, authorName } = bodySchema.parse(body);

    const prompt = `
      Eu quero uma lista com exatamente ${quantityOfQuestions} perguntas, nem mais e nem menos, bem detalhadas e profundas sobre o livro "${bookName}", do(a) autor(a) ${authorName}. 

      Me retorne em um json baseado no seguinte schema do zod:
        z.object({
          questions: z.array(
            z.object({
              title: z.string(),
              answers: z.array(
                z.object({
                  id: z.string(),
                  text: z.string(),
                }),
              ),
              correct: z.string(),
            })
          )
        })
      
      Coisas importantes:
      - Eu quero que o id de cada answer seja um id do tipo cuid
      - Eu quero que o campo "correct" seja o id da alternativa correta
      - É importante que as respostas façam sentido com o livro
      - É importante que as perguntas sejam bem detalhadas e profundas
      - É importante que a lista de perguntas seja variada e não repetitiva
      - É importante que a lista de perguntas tenha exatamente ${quantityOfQuestions} perguntas
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-4o-mini',
      temperature: 0.7,
      response_format: zodResponseFormat(outputSchema, 'quiz'),
    });

    const quiz = completion.choices[0].message.content;

    return NextResponse.json({
      data: JSON.parse(quiz!),
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      error,
    });
  }
};
