import { NextRequest } from "next/server";
import { verifyToken } from "../utils/token";
export async function createTRPCContext({ req }: { req: NextRequest }) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader(accessToken?: string) {
    if (accessToken) {
      const validUser = await verifyToken(accessToken);
      if (!validUser) {
        return null;
      } else {
        return validUser.payload;
      }
    }
    return null;
  }
  const accessToken = req.cookies.get("accessToken")?.value;
  const user = await getUserFromHeader(accessToken);
  return {
    user: user,
  };
}
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
