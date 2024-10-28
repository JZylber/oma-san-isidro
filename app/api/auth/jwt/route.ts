import { errors } from "jose";
import { NextRequest } from "next/server";
import { prisma } from "server/db";
import {
  createToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "utils/token";

const handler = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!accessToken || !refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  let refreshTokenVerification;
  try {
    refreshTokenVerification = await verifyRefreshToken(refreshToken);
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }
  let accessTokenExpired = false;
  try {
    await verifyAccessToken(accessToken);
  } catch (e) {
    if (e instanceof errors.JWTExpired) {
      accessTokenExpired = true;
    } else {
      return new Response("Unauthorized", { status: 401 });
    }
  }
  const userId = refreshTokenVerification.payload.userId as number;
  const userToken = (
    await prisma.usuario.findUnique({
      where: {
        id_usuario: userId,
      },
      select: {
        token: true,
      },
    })
  )?.token;
  if (userToken !== refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (accessTokenExpired) {
    const newAccessToken = await createToken(
      {
        userId,
        nombre: refreshTokenVerification.payload.nombre as string,
        apellido: refreshTokenVerification!.payload.apellido as string,
        rol: refreshTokenVerification.payload.rol as string,
      },
      "access"
    );
    return new Response(
      JSON.stringify({ text: "Authorized", accessToken: newAccessToken }),
      {
        status: 200,
      }
    );
  }
  return new Response(JSON.stringify({ text: "Authorized" }), { status: 200 });
};

export { handler as GET, handler as POST };
