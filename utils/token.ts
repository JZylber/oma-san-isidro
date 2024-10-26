import { jwtVerify, SignJWT } from "jose";

const SECRET_KEY = process.env.JWT_KEY as string;

export interface TokenPayload {
  userId: number;
  nombre: string;
  apellido: string;
  role: string;
}

export async function verifyToken(jwtToken: string) {
  try {
    return await jwtVerify(jwtToken, new TextEncoder().encode(SECRET_KEY));
  } catch (e) {
    console.log("e:", e);
    return null;
  }
}

export async function createToken(payload: TokenPayload) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 3;
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(SECRET_KEY));
  return token;
}
