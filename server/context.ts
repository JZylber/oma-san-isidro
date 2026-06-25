import { NextRequest } from "next/server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { User } from "contexts/UserContext";
import { verifyAuthTokens } from "../utils/verifyAuth";

export async function createTRPCContext({
  req,
  cookies,
}: {
  req: NextRequest;
  cookies: ReadonlyRequestCookies;
}) {
  function setHTTPOnlyCookie(name: string, value: string, maxAge?: number) {
    cookies.set(name, value, {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      ...(maxAge !== undefined && { maxAge }),
    });
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  let user: User | null = null;

  if (refreshToken) {
    const result = await verifyAuthTokens(accessToken, refreshToken);
    if (result.authorized && result.user) {
      user = {
        id: result.user.userId,
        nombre: result.user.nombre,
        apellido: result.user.apellido,
        rol: result.user.rol,
      };
      if (result.newAccessToken) {
        setHTTPOnlyCookie("accessToken", result.newAccessToken, 60);
      }
    }
  }

  return {
    user,
    setHTTPOnlyCookie,
  };
}
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
