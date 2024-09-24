import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../prisma';
import z from 'zod';

export const getChapters: FastifyPluginAsyncZod = async function (app) {
    app.get('/chapters/:bookNumber', {
        schema: {
            params: z.object({
                bookNumber: z.coerce.number().min(1, "O número do livro deve estar entre 1 e 73").max(73, "O número do livro deve estar entre 1 e 73")
            }),
            querystring: z.object({
                page: z.coerce.number().min(1).default(1),
                itemsPerPage: z.coerce.number().min(1).max(100).default(10) 
            })
        }
    }, async (req) => {
        const { bookNumber } = req.params;
        const { page, itemsPerPage } = req.query;

        // Calcular quantos capítulos pular e quantos pegar
        const skip = (page - 1) * itemsPerPage;
        const take = itemsPerPage;

        // Buscar o total de capítulos para a paginação
        const totalChapters = await prisma.chapter.count({
            where: { bookNumber: bookNumber }
        });

        // Buscar os capítulos paginados
        const result = await prisma.book.findUnique({
            where: {
                number: bookNumber
            },
            select: {
                name: true,
                chapters: {
                    skip,   // Pular capítulos com base na página
                    take,   // Limitar o número de capítulos retornados
                    orderBy: { number: 'asc' },
                    select: {
                        number: true,
                        verses: {
                            orderBy: { number: 'asc' },
                            select: {
                                number: true,
                                text: true
                            }
                        }
                    }
                }
            },
        });

        // Calcular o número total de páginas
        const totalPages = Math.ceil(totalChapters / itemsPerPage);

        // Formatar o resultado
        const formattedResult = {
            total_pages: totalPages,
            current_page: page,
            book: result?.name,
            chapters: result?.chapters
        };

        // Retornar o resultado paginado
        return {
            ...formattedResult
        };
    });
};
