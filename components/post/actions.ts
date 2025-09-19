"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import getShortenedId from "@/utils/getShortener";

export async function createPost(formData: FormData) {
    
    const gameRawgIdRaw = formData.get("gameId");
    const gameRawgId = gameRawgIdRaw && Number(gameRawgIdRaw) !== 0
        ? Number(gameRawgIdRaw)
        : null;
    const content = formData.get("content") as string;
    const played = formData.get("played") as string;
    const session = await getServerSession(authOptions);
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
            userId: session.user.id,
            gameId: gameRawgId,
            played: played ? Number(played) : 0,
        },
    });
}
