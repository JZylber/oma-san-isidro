import { z } from 'zod';
import { INSTANCIA } from "@prisma/client";

export const INSTANCE = z.nativeEnum(INSTANCIA);