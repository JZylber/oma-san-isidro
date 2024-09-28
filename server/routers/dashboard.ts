import { protectedProcedure, router } from "../trpc";
import { z } from 'zod';
import { INSTANCE } from "../types";

export const dashboardRouter = router({
    getResults: protectedProcedure.input(z.object({
        año: z.number(),
        instancia: INSTANCE,
        competencia: z.string(),
    }),
    ).query(({ctx,input}) => {
        return ({ctx,input});
    }),
});