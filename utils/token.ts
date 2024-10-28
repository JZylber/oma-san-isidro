import { error } from "console";
import { jwtVerify, SignJWT } from "jose";

const ACCESS_TOKEN_KEY = process.env.JWT_ACCESS_KEY as string;
const REFRESH_TOKEN_KEY = process.env.JWT_REFRESH_KEY as string;

export interface TokenPayload {
  userId: number;
  nombre: string;
  apellido: string;
  rol: string;
}

export async function verifyAccessToken(jwtToken: string) {
  return await jwtVerify<TokenPayload>(
    jwtToken,
    new TextEncoder().encode(ACCESS_TOKEN_KEY)
  );
}

export async function verifyRefreshToken(jwtToken: string) {
  return await jwtVerify<TokenPayload>(
    jwtToken,
    new TextEncoder().encode(REFRESH_TOKEN_KEY)
  );
}

export async function createToken(
  payload: TokenPayload,
  type: "access" | "refresh",
  expiresIn?: number
) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = expiresIn ? iat + expiresIn : iat + 60;
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(
      new TextEncoder().encode(
        type === "access" ? ACCESS_TOKEN_KEY : REFRESH_TOKEN_KEY
      )
    );
  return token;
}
