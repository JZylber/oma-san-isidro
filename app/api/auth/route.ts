import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { prisma } from '../../../server/db';

/* JWT secret key */
const KEY = process.env.JWT_KEY as string;

export default async function POST(request : Request) {
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
    bcrypt.compare(password, userPassword).then(isMatch => {
        /* User matched */
        if (isMatch) {
            /* Create JWT Payload */
            const payload = {
              id: userId,
              email: userEmail,
              nombre: userName,
              apellido: userSurname,
            };
            /* Sign token */
            jwt.sign(
              payload,
              KEY,
              {
                expiresIn: 3600, // 1 year in seconds
              },
              (err, token) => {
                /* Send succes with token */
                return NextResponse.json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              }
            );
        }
        else {
            /* Send error with message */
            return NextResponse.json({ status: 'error', error: 'Usuario o contraseña incorrectas' });
        }     
    });
};