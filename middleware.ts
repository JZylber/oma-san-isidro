import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {verifyToken} from './utils/tokenVerification';

 
export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;
  const validToken = currentUser ? await verifyToken(currentUser) : null;
  if (!validToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: '/dashboard/:path*',
}