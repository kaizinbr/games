"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function AvatarUpload({initialUrl}: {initialUrl?: string}) {
    const [preview, setPreview] = useState<string | null>(initialUrl || null);

    // async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     const fileInput = e.currentTarget.elements.namedItem(
    //         "file"
    //     ) as HTMLInputElement;
    //     if (!fileInput.files?.length) return;

    //     const formData = new FormData();
    //     formData.append("file", fileInput.files[0]);

    //     // 1. Envia p/ Blob
    //     const res = await fetch("/api/profile/upload-avatar", {
    //         method: "POST",
    //         body: formData,
    //     });
    //     const { url } = await res.json();

    //     // 2. Salva no banco
    //     await fetch("/api/profile/avatar", {
    //         method: "POST",
    //         body: JSON.stringify({ url }),
    //         headers: { "Content-Type": "application/json" },
    //     });

    //     setPreview(url);
    // }

    return (
        <label className="cursor-pointer">
            {preview ? (
                <Image
                    width={128}
                    height={128}
                    src={preview}
                    alt="Avatar preview"
                    className="w-32 h-32 rounded-full object-cover"
                />
            ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    Selecionar imagem
                </div>
            )}
            <input
                type="file"
                name="file"
                accept="image/*"
                className="hidden"
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files?.length) return;

                    const formData = new FormData();
                    formData.append("file", e.target.files[0]);

                    // 1. Envia p/ Blob
                    const res = await axios.post("/api/profile/upload-avatar", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    const { url } = res.data;

                    // 2. Salva no banco
                    await axios.post("/api/profile/avatar", { url }, {
                        headers: { "Content-Type": "application/json" },
                    });

                    setPreview(url);
                }}
            />
        </label>
    );
}
