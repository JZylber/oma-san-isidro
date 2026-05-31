import { errors } from "jose";
import { prisma } from "server/db";
import { createToken, verifyAccessToken, verifyRefreshToken, TokenPayload } from "./token";

export interface VerifyAuthResult {
  authorized: boolean;
  newAccessToken?: string;
  user?: TokenPayload;
}

export async function verifyAuthTokens(
  accessToken: string | undefined,
  refreshToken: string
): Promise<VerifyAuthResult> {
  let refreshVerification: Awaited<ReturnType<typeof verifyRefreshToken>>;
  try {
    refreshVerification = await verifyRefreshToken(refreshToken);
  } catch {
    return { authorized: false };
  }

  let accessTokenExpired = accessToken === undefined;
  if (!accessTokenExpired) {
    try {
      await verifyAccessToken(accessToken!);
    } catch (e) {
      if (e instanceof errors.JWTExpired) {
        accessTokenExpired = true;
      } else {
        return { authorized: false };
      }
    }
  }

  const { userId, nombre, apellido, rol } = refreshVerification.payload;
  const userToken = (
    await prisma.usuario.findUnique({
      where: { id_usuario: userId },
      select: { token: true },
    })
  )?.token;

  if (userToken !== refreshToken) {
    return { authorized: false };
  }

  const user: TokenPayload = { userId, nombre, apellido, rol };

  if (accessTokenExpired) {
    const newAccessToken = await createToken(user, "access");
    return { authorized: true, newAccessToken, user };
  }

  return { authorized: true, user };
}
