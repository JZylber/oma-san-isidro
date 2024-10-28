import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
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
    return NextResponse.redirect(request.nextUrl, {
      headers: {
        "Set-Cookie": `accessToken=${newAccessToken}; SameSite=Strict; ${
          process.env.NODE_ENV === "production" ? "Secure" : ""
        }`,
      },
    });
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
