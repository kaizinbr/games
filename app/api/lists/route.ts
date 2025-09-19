import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import getShortenedId from "@/utils/getShortener";

export async function POST(request: Request) {
    const {  listName, description } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!listName) {
        return NextResponse.json({ error: "List name is required" }, { status: 400 });
    }

    try {
        const newList = await prisma.list.create({
            data: {
                name: listName,
                shortId: getShortenedId(),
                description,
                userId: session.user.id,
            }
        });
        return NextResponse.json(newList, { status: 201 });
    } catch (error) {
        console.error("Error creating list:", error);
        return NextResponse.json({ error: "Failed to create list" }, { status: 500 });
    }
}
