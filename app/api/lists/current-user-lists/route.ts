import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";


export async function GET() {
    // const {  listName, description } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const userLists = await prisma.list.findMany({
            where: {
                userId: session.user.id,
            },
        });
        return NextResponse.json(userLists, { status: 200 });
    } catch (error) {
        console.error("Error fetching user lists:", error);
        return NextResponse.json({ error: "Failed to fetch user lists" }, { status: 500 });
    }
}
