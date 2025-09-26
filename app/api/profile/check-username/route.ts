import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (!username) return NextResponse.json({ available: false });

    const exists = await prisma.profile.findUnique({
        where: { lowername: username.toLowerCase() },
    });

    return NextResponse.json({ available: !exists });
}
