import {
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../../server/routers/_app";
import { NextRequest } from "next/server";
import { createTRPCContext } from "../../../../server/context";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    req,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
    process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
          }
        : undefined,
  });

export { handler as GET, handler as POST };