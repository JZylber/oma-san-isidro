import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "server/db";
import { createToken } from "utils/token";
import { User } from "contexts/UserContext";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "Falta el usuario o contraseña" }
    );
  }
  const user = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "Usuario o contraseña incorrecto" }
    );
  }
  const userId = user.id_usuario;
  const userPassword = user.password;
  const isValid = await bcrypt.compare(password, userPassword);
  if (isValid) {
    /* Create token */
    const token = await createToken({ userId, role: "admin" });
    /* Send token */
    return NextResponse.json({
      success: true,
      token: token,
      usuario: {
        id: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: "admin",
      } as User,
    });
  } else {
    /* Send error with message */
    return NextResponse.json(
      { success: false },
      { status: 401, statusText: "Usuario o contraseña incorrecto" }
    );
  }
}
