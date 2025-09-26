import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const { url } = await req.json();
    const session = await auth(); // pega usuário logado

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    await prisma.profile.update({
        where: { id: session.user.id },
        data: { avatarUrl: url },
    });

    return NextResponse.json({ success: true });
}
