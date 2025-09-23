// app/register/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth-utils";
import { create } from "@/lib/auth";  // se quiser registrar e logar logo após

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // verificar existência, validações etc

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      // outros campos do profile, se for criar profile junto
    }
  });

  // opcional: logar automaticamente, redirecionar

  return user;
}
