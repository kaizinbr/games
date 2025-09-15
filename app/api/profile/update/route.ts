import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { id, data } = await request.json();
    if (!id || !data) return NextResponse.json({ success: false });

    try {
        await prisma.profile.update({
            where: { id },
            data: {
                username: data.username,
                lowername: data.username?.toLowerCase(),
                name: data.name,
                bio: data.bio,
                avatarUrl: data.avatarUrl,
                pronouns: data.pronouns,
                site: data.site,
                favoriteGenre: data.favoriteGenre,
                age: data.age ? Number(data.age) : null,
            },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ success: false });
    }
}

