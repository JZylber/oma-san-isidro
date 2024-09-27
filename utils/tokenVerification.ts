import { jwtDecrypt, jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_KEY as string;

export async function verifyToken(jwtToken: string) {
  try {
    return await jwtVerify(jwtToken, new TextEncoder().encode(SECRET_KEY));
  } catch (e) {
    console.log('e:', e);
    return null;
  }
}

export async function decryptToken(jwtToken: string) {
    const token = await jwtDecrypt(jwtToken, new TextEncoder().encode(SECRET_KEY));
    return token;
    }