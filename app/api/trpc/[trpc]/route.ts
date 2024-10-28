import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../../server/routers/_app";
import { NextRequest, NextResponse } from "next/server";
import { createTRPCContext } from "../../../../server/context";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const createContext = async (
  req: NextRequest,
  cookies: ReadonlyRequestCookies
) => {
  return createTRPCContext({
    req,
    cookies,
  });
};

const handler = (req: NextRequest) => {
  const cookieStore = cookies();
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req, cookieStore),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };
