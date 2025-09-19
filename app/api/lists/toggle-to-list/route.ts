import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function POST(request: Request) {
    const {
        listId,
        gameId,
        title,
        coverUrl,
        genre,
        platform,
        publisher,
        releaseDate,
        playtime,
    } = await request.json();

    const session = await getServerSession(authOptions);

    // segurança para garantir que o usuário está autenticado
    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    if (!listId || !gameId) {
        return NextResponse.json(
            { error: "List ID and Game ID are required" },
            { status: 400 }
        );
    }

    //verificar se game já existe
    let game = await prisma.game.findUnique({
        where: { rawgId: gameId },
    });

    if (!game) {
        game = await prisma.game.create({
            data: {
                title,
                rawgId: gameId,
                coverUrl,
                genre,
                platform,
                publisher,
                releaseDate,
                playtime,
            },
        });
    }

    try {
        const exist = await prisma.listGame.findFirst({
            where: {
                listId,
                gameId,
            },
        });

        if (exist) {
            await prisma.listGame.delete({
                where: { id: exist.id },
            });
            return NextResponse.json(
                { message: "tirou" },
                { status: 200 }
            );
        } else {
            const addGame = await prisma.listGame.create({
                data: {
                    listId,
                    gameId,
                },
            });
            return NextResponse.json({ message: "botou", addGame }, { status: 201 });
        }
    } catch (error) {
        console.error("Error creating list:", error);
        return NextResponse.json(
            { error: "Failed to create list" },
            { status: 500 }
        );
    }
}
