import { NextRequest } from 'next/server';
import { verifyToken} from '../utils/token';
export async function createTRPCContext({
  req,
}: {req: NextRequest}) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    const currentUser = req.cookies.get('currentUser')?.value
    if (currentUser) {
      const validUser = await verifyToken(currentUser);
      if (!validUser) {
        return null;
      } else {
        return validUser.payload;
      }
    }
    return null;
  }
  const user = await getUserFromHeader();
  return {
    user: user
  };
}
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;