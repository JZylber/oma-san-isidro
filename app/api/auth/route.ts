import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../server/db';
import { SignJWT } from 'jose';

/* JWT secret key */
const KEY = process.env.JWT_KEY as string;

export async function POST(request : NextRequest) {
    const {email, password} = await request.json();
    if (!email || !password) {
        return NextResponse.json(
            { success: false },
            {status: 400,
            statusText: 'Falta el usuario o contraseña'});
    }
    const user = await prisma.usuario.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        return NextResponse.json(
            { success: false },
            {status: 400,
            statusText: 'Usuario no encontrado'});
    }
    const userId = user.id_usuario,
        userEmail = user.email,
        userPassword = user.password,
        userName = user.nombre,
        userSurname = user.apellido;
    const isValid = await bcrypt.compare(password, userPassword);
    if (isValid) {
        /* Create token */
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60* 60;
        const token = await new SignJWT({ userId, userEmail, userName, userSurname })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime(exp)
          .setIssuedAt(iat)
          .setNotBefore(iat)
          .sign(new TextEncoder().encode(KEY));
        /* Send token */
        return NextResponse.json({ success: true , token });
    } else {
        /* Send error with message */
        return NextResponse.json({ status: 'error', error: 'Usuario o contraseña incorrectas' });
    };
};
