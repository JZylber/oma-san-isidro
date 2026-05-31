import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const credentials = await fetch(request.nextUrl.origin + "/api/auth/jwt", {
    method: "POST",
    headers: request.headers,
  });
  if (credentials.status === 401 || credentials.status === 500) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const { accessToken: newAccessToken } = await credentials.json();
  if (newAccessToken) {
    const res = NextResponse.next();
    res.cookies.set("accessToken", newAccessToken, {
      sameSite: "strict",
      httpOnly: true,
      maxAge: 60,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
