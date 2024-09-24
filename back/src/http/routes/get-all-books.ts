import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../prisma';

export const getAllBooks: FastifyPluginAsyncZod = async function (app) {
    app.get('/books', async () => {
        const books =  await prisma.book.findMany({
            orderBy: {
                number: 'asc'
            }
        });

        return {
            books
        }
    })
};