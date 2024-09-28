import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenPayload } from '../utils/tokenVerification';
export async function createContext({
  req,
  res,
}: {req:NextRequest, res:NextResponse}) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    const currentUser = req.cookies.get('currentUser')?.value;
    if (currentUser) {
      const validUser = await verifyToken(currentUser);
      if (!validUser) {
        return null;
      } else {
        return await getTokenPayload(currentUser);
      }
    }
    return null;
  }
  const user = await getUserFromHeader();
  return {
    user,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;