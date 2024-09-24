import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../prisma';
import z from 'zod';

export const getRandomChapter: FastifyPluginAsyncZod = async function (app) {
  app.get('/random-chapter', {
    schema: {
      querystring: z.object({
        isGospel: z.coerce.boolean().default(false),
      }),
    },
  }, async (req) => {
    const { isGospel } = req.query;

    // Selecionar um capítulo aleatório de acordo com o valor de 'isGospel'
    const randomBookChapter = await prisma.chapter.findFirst({
      where: isGospel ? { book: { isGospel: true } } : {},
      orderBy: {
        // Usa a função RANDOM do Prisma
        // Pode variar dependendo do banco de dados, mas em PostgreSQL funciona
        // Se estiver usando MySQL, você pode trocar `random()` por `RAND()`
        number: 'asc'
      },
      skip: Math.floor(Math.random() * await prisma.chapter.count({
        where: isGospel ? { book: { isGospel: true } } : {},
      })),
      include: {
        book: true,
        verses: {
          select: {
            number: true,
            text: true,
          },
        },
      },
    });

    if (!randomBookChapter) {
      return { error: 'Nenhum capítulo encontrado.' };
    }

    // Formatando o resultado para retornar os dados
    const formattedResult = {
      bookName: randomBookChapter.book.name,
      bookNumber: randomBookChapter.book.number,
      chapterNumber: randomBookChapter.number,
      verses: randomBookChapter.verses.map((verse) => ({
        verseNumber: verse.number,
        text: verse.text,
      })),
    };

    return formattedResult;
  });
};
