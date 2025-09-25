import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const tab = searchParams.get("type");

    console.log(`Searching for ${query} in ${tab}`);

    if (!query || query.trim() === "") {
        return NextResponse.json(
            { error: "Query parameter 'q' is required." },
            { status: 400 }
        );
    }
    if (!tab || !["profiles", "games", "posts", "lists"].includes(tab)) {
        return NextResponse.json(
            { error: "Invalid or missing 'type' parameter." },
            { status: 400 }
        );
    }

    let results;
    if (tab === "profiles") {
        results = await prisma.profile.findMany({
            where: {
                OR: [
                    { username: { contains: query, mode: "insensitive" } },
                    { lowername: { contains: query, mode: "insensitive" } },
                    { name: { contains: query, mode: "insensitive" } },
                ],
            },
        });
    } else if (tab === "games") {
        const response = await axios.get(
            `https://api.rawg.io/api/games?key=${
                process.env.RAWG_API_KEY
            }&search=${encodeURIComponent(query)}&page_size=20`
        );
        results = response.data.results;
    } 
    // else if (tab === "posts") {
    //     results = await prisma.gamePost.findMany({
    //         where: {
    //             OR: [
    //                 { title: { contains: query, mode: "insensitive" } },
    //                 { content: { contains: query, mode: "insensitive" } },
    //             ],
    //         },
    //     });
    // } else if (tab === "lists") {
    //     results = await prisma.list.findMany({
    //         where: {
    //             OR: [
    //                 { title: { contains: query, mode: "insensitive" } },
    //                 { description: { contains: query, mode: "insensitive" } },
    //             ],
    //         },
    //     });
    // }
    return NextResponse.json({ results });
}
