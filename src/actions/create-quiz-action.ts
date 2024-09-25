'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { openai } from '@/lib/openai';
import { zodResponseFormat } from 'openai/helpers/zod';

const schema = z.object({
  bookName: z.string(),
  authorName: z.string(),
  quantityOfQuestions: z.number(),
});

export const createQuizAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { bookName, authorName, quantityOfQuestions } }) => {
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

    const formatSchema = z.object({
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

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-4o-mini',
      temperature: 0.7,
      response_format: zodResponseFormat(formatSchema, 'quiz'),
    });

    const quiz = completion.choices[0].message.content;

    if (!quiz) {
      return {
        code: 500,
        quiz: null,
      };
    }

    return {
      code: 200,
      quiz: JSON.parse(quiz),
    };
  });
