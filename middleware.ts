import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const SECRET_KEY = process.env.JWT_KEY as string;

async function verifyToken(jwtToken: string) {
  try {
    return await jwtVerify(jwtToken, new TextEncoder().encode(SECRET_KEY));
  } catch (e) {
    console.log('e:', e);
    return null;
  }
}
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;
  const validToken = currentUser ? verifyToken(currentUser) : null;
  if (!validToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: '/dashboard/:path*',
}