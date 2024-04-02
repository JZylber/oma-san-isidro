import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const scraperRouter = router({
    getBooks : publicProcedure
    .query(async () => {
        const books = [{
            nombre: "Libro 1",
            categoria: "Categoria 1",
            precio: 100,
            autores: ["Autor 1","Autor 2"],
            páginas: 200
        }]
        return books
    })
});