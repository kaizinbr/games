import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const gameId = params.id;

    console.log(`Searching for game with ID: ${gameId}`);

    if (!gameId || isNaN(Number(gameId))) {
        return NextResponse.json(
            { error: "Query parameter 'id' is required." },
            { status: 400 }
        );
    }

    const response = await axios.get(
        `https://api.rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`
    );

    if (response.status !== 200) {
        return NextResponse.json(
            { error: "Failed to fetch game data from RAWG API." },
            { status: response.status }
        );
    }
    const gameData = response.data;
    console.log("Fetched game data:", gameData);

    // Check if the game already exists in the database
    let game = await prisma.game.findUnique({
        where: { rawgId: Number(gameId) },
    });
    if (!game) {
        // If not, create a new game entry
        game = await prisma.game.create({
            data: {
                rawgId: gameData.id,
                title: gameData.name,
                coverUrl: gameData.background_image,
                releaseDate: gameData.released,
                playtime: gameData.playtime,
                // Add other fields as necessary
            },
        });
    }
    return NextResponse.json(game);
}
