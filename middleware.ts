import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { handleTokenLogin } from "utils/login";

export async function middleware(request: NextRequest, response: NextResponse) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log(accessToken, "\n", refreshToken);
  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const { success, newAccessToken } = await handleTokenLogin(
    accessToken,
    refreshToken
  );
  if (!success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
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
