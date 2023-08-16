import { router } from '../trpc';
import { instanceRouter } from './instances';
import { resultRouter } from './results';

export const appRouter = router({
  instance: instanceRouter,
  results: resultRouter
});

export type AppRouter = typeof appRouter;