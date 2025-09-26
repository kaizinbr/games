"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"
import bcrypt from "bcryptjs";

import getShortenedId from "@/utils/getShortener";

export async function createPost(formData: FormData) {
    
    const gameRawgIdRaw = formData.get("gameId");
    const gameRawgId = gameRawgIdRaw && Number(gameRawgIdRaw) !== 0
        ? Number(gameRawgIdRaw)
        : null;
    const content = formData.get("content") as string;
    const played = formData.get("played") as string;
    const session = await auth();
    if (!session?.user) {
        throw new Error("You must be logged in to create a post");
    }

    if (gameRawgId) {
        await prisma.game.upsert({
            where: { rawgId: gameRawgId },
            update: {},
            create: {
                rawgId: gameRawgId,
                title: "Título do jogo", // ideal pegar da API externa
            },
        });
    }

    console.log("Form Data:", formData);
    console.log("Game ID:", formData.get("gameId"));

    await prisma.gamePost.create({
        data: {
            content,
            shortId: getShortenedId(),
            userId: session.user.id as string,
            gameId: gameRawgId,
            played: played ? Number(played) : 0,
        },
    });
}


export async function setPasswordAction(
    prevState: { success: boolean | null; message: string | null },
    formData: FormData
) {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (!password || password.length < 8) {
        return { success: false, message: "A senha deve ter pelo menos 8 caracteres." };
    }
    if (password !== confirmPassword) {
        return { success: false, message: "As senhas não coincidem." };
    }
    // Aqui você pode adicionar outras validações

    const session = await auth();
    if (!session?.user) {
        return { success: false, message: "Você precisa estar logado." };
    }
    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            password: await bcrypt.hash(password, 10),
        },
    });

    return { success: true, message: "Senha atualizada com sucesso!" };
}