import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../prisma';
import z from 'zod';

export const getSingleChapter: FastifyPluginAsyncZod = async function (app) {
    app.get('/chapters/:bookNumber/:chapterNumber', {
        schema: {
            params: z.object({
                bookNumber: z.coerce.number().min(1, {message:"O número do livro deve estar entre 1 e 73"}).max(73,  {message:"O número do livro deve estar entre 1 e 73"}),
                chapterNumber: z.coerce.number().min(1, {message:"O número do capítulo deve ser maior que 0"})
            })
        }
    }, async (req) => {
        const { bookNumber, chapterNumber } = req.params;
        
        const book = await prisma.book.findFirst({
            where: {
              number: bookNumber,
            },
            select: {
              name: true,
              number: true,
              chapters: {
                where: {
                  number: chapterNumber,
                },
                select: {
                  number: true,
                  verses: {
                    select: {
                      number: true,
                      text: true,
                    },
                  },
                },
              },
            },
          });
        
        return {
            bookName: book?.name,
            chapterNumber: book?.chapters[0]?.number,
            verses: book?.chapters[0]?.verses.map((verse) => ({
                verseNumber: verse.number,
                text: verse.text,
            })),
        };
    });
};
