import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async function isAuthed(
    opts,
  ) {
    const { ctx } = opts;
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: `${Object.keys(ctx).length}` });
    }
    return opts.next({
      ctx: {
        uid: ctx.user,
      },
    });
  });
  