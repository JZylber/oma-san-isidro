import { prisma } from "server/db";
import bcrypt from "bcryptjs";
import { createToken } from "./token";
import { User } from "contexts/UserContext";

interface LoginResponse {
  success: boolean;
  statusText?: string;
  token?: string;
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
    const token = await createToken({
      userId,
      nombre: user.nombre,
      apellido: user.apellido,
      role: user.rol,
    });
    /* Send token */
    return {
      success: true,
      token: token,
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

export default login;
