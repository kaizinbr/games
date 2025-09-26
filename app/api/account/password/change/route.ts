import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const { oldPassword, password, confirmPassword } = await request.json();
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!password || password.length < 8) {
        return NextResponse.json({ error: "A senha deve ter pelo menos 8 caracteres." }, { status: 400 });
    }
    if (password !== confirmPassword) {
        return NextResponse.json({ error: "As senhas não coincidem." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.password) {
        return NextResponse.json({ error: "Usuário não encontrado ou sem senha definida." }, { status: 404 });
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
        return NextResponse.json({ error: "Senha antiga incorreta." }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword }
        });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
    }
}
