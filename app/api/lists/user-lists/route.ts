import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/auth";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // const session = await getServerSession(authOptions);

    if (!userId) {
        return NextResponse.json({ error: "Diga um usuário, po" }, { status: 401 });
    }

    try {
        const userLists = await prisma.list.findMany({
            where: {
                userId,
            },
        });
        return NextResponse.json(userLists, { status: 200 });
    } catch (error) {
        console.error("Error fetching user lists:", error);
        return NextResponse.json({ error: "Failed to fetch user lists" }, { status: 500 });
    }
}
