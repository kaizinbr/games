import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "Arquivo não enviado" },
            { status: 400 }
        );
    }

    // Faz o upload p/ Vercel Blob
    const { url } = await put(`avatars/${file.name}`, file, {
        access: "public", // ou "private" se quiser usar signed URLs
        addRandomSuffix: true,
    });

    return NextResponse.json({ url });
}
