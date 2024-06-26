import { router } from '../trpc';
import { instanceRouter } from './instances';
import { resultRouter } from './results';
import { scraperRouter } from './scraping';

export const appRouter = router({
  instance: instanceRouter,
  results: resultRouter,
  scraper: scraperRouter
});

export type AppRouter = typeof appRouter;