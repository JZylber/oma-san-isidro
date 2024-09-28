import { jwtDecrypt, JWTDecryptResult, jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_KEY as string;

export interface TokenPayload {
    userId: number;
    userEmail: string;
    userName: string;
    userSurname: string;
    }

export async function verifyToken(jwtToken: string) {
  try {
    return await jwtVerify(jwtToken, new TextEncoder().encode(SECRET_KEY));
  } catch (e) {
    console.log('e:', e);
    return null;
  }
}
