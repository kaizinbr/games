import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth"; // se estiver usando next-auth
import { authOptions } from "@/auth";

export async function POST(req: Request) {
    const { url } = await req.json();
    const session = await getServerSession(authOptions); // pega usuário logado

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    await prisma.profile.update({
        where: { id: session.user.id },
        data: { avatarUrl: url },
    });

    return NextResponse.json({ success: true });
}
