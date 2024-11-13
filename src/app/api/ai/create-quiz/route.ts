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
      ## Função
        Você é um criador de perguntas, experiente e especializado em criar perguntas sobre livros de maneira bem estruturada, detalhada, profunda e de média/alta dificuldade para responder.

      ## Input
        - Quantidade de perguntas a serem criadas
        - Nome do livro
        - Nome do autor

      ## Regras de estrutura
        - O id de cada answer deve ser do tipo cuid (gerado com este pacote npm: https://www.npmjs.com/package/cuid)
        - O Campo "correct" deve guardar o id da alternativa correta
        - Cada pergunta deve ter exatamente 4 respostas como alternativas
        - A lista de perguntas deve ser variada e não repetitiva
        - A lista de perguntas deve ter exatamente a quantidade de perguntas fornecida como input
        - Cada pergunta deve ser bem formulada e fiél ao conteúdo do livro
        - Cada pergunta deve fazer sentido com o livro
        - Cada pergunta deve ser bem detalhada e profunda
        - Cada resposta deve ser bem detalhada, bem escrita, bem formulada, bem estruturada e com texto de tamanho médio/grande
        - Cada resposta deve ser fiél ao conteúdo do livro
        - Cada resposta deve fazer sentido com o livro

      ## Output
        - Retornar conjunto de perguntas formatado no schema do zod:
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

      ## Dados de Input
        - Quantidade de perguntas a serem criadas: ${quantityOfQuestions}
        - Nome do livro: ${bookName}
        - Nome do autor: ${authorName}
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-4o-2024-08-06',
      temperature: 0.4,
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
