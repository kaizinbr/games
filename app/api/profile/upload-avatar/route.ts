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

    const { url } = await put(`avatars/${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
    });

    console.log("Avatar uploaded to:", url);

    return NextResponse.json({ url });
}
