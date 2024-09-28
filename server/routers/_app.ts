import { router } from '../trpc';
import { dashboardRouter } from './dashboard';
import { instanceRouter } from './instances';
import { resultRouter } from './results';
import { scraperRouter } from './scraping';

export const appRouter = router({
  instance: instanceRouter,
  results: resultRouter,
  scraper: scraperRouter,
  dashboard: dashboardRouter
});

export type AppRouter = typeof appRouter;