import { router } from '../trpc';
import { instanceRouter } from './instances';

export const appRouter = router({
  instance: instanceRouter
});

export type AppRouter = typeof appRouter;