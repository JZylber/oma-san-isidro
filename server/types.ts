import { z } from "zod";
import { INSTANCIA, ROL } from "@prisma/client";

export const INSTANCE = z.nativeEnum(INSTANCIA);
export const ROLE = z.nativeEnum(ROL);
