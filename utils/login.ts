import { prisma } from "server/db";
import bcrypt from "bcryptjs";
import { createToken, verifyAccessToken, verifyRefreshToken } from "./token";
import { User } from "contexts/UserContext";
import { errors } from "jose";

interface LoginResponse {
  success: boolean;
  statusText?: string;
  accessToken?: string;
  refreshToken?: string;
  usuario?: User;
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const user = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return {
      success: false,
      statusText: "Usuario o contraseña incorrecto",
    };
  }
  const userId = user.id_usuario;
  const userPassword = user.password;
  const isValid = await bcrypt.compare(password, userPassword);
  if (isValid) {
    /* Create token */
    const accessToken = await createToken(
      {
        userId,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
      },
      "access"
    );
    const refreshToken = await createToken(
      {
        userId,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
      },
      "refresh",
      60 * 60 * 24 * 30
    );
    /* Send token */
    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      usuario: {
        id: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
      } as User,
    };
  } else {
    return {
      success: false,
      statusText: "Usuario o contraseña incorrecto",
    };
  }
};

interface TokenVerification {
  success: boolean;
  newAccessToken?: string;
}

export const handleTokenLogin = async (
  accessToken: string,
  refreshToken: string
): Promise<TokenVerification> => {
  let refreshTokenVerification;
  try {
    refreshTokenVerification = await verifyRefreshToken(refreshToken);
  } catch (e) {
    return {
      success: false,
    };
  }
  let accessTokenExpired = false;
  try {
    await verifyAccessToken(accessToken);
  } catch (e) {
    if (e instanceof errors.JWTExpired) {
      accessTokenExpired = true;
    } else {
      return {
        success: false,
      };
    }
  }
  const userId = refreshTokenVerification.payload.userId as number;
  /*const userToken = (
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
    return {
      success: false,
    };
  }*/
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
    return {
      success: true,
      newAccessToken,
    };
  }
  return {
    success: true,
  };
};

export default login;
