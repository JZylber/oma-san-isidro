import { NextRequest } from "next/server";
import { verifyRefreshToken } from "../utils/token";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { User } from "contexts/UserContext";
export async function createTRPCContext({
  req,
  cookies,
}: {
  req: NextRequest;
  cookies: ReadonlyRequestCookies;
}) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader(refreshToken: string) {
    try {
      const user = (await verifyRefreshToken(refreshToken)).payload;
      return {
        id: user.userId,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
      } as User;
    } catch (e) {
      return null;
    }
  }
  function setHTTPOnlyCookie(name: string, value: string) {
    cookies.set(name, value, {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
  }
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  let user = null;
  if (accessToken && refreshToken) {
    console.log("url", req.nextUrl.origin + "/api/auth/jwt");

    const credentials = await fetch(req.nextUrl.origin + "/api/auth/jwt", {
      method: "POST",
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });
    if (credentials.status === 200) {
      const { accessToken: newAccessToken } = await credentials.json();
      user = await getUserFromHeader(refreshToken);
      if (newAccessToken) {
        cookies.set("accessToken", newAccessToken, {
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
      }
    }
  }
  return {
    user,
    setHTTPOnlyCookie,
  };
}
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
