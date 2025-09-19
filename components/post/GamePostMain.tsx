"use client";
import Form from "next/form";
import { createPost } from "@/components/post/actions";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Game } from "@/utils/types";
import axios from "axios";

export default function GamePostMain() {
    const searchParams = useSearchParams();
    const gameId = searchParams.get("gameId")
        ? Number(searchParams.get("gameId"))
        : 0;

    const [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        if (gameId) {
            axios
                .get(`/api/games/${gameId}`)
                .then((res) => setGame(res.data))
                .catch((err) =>
                    console.error("Error fetching game data:", err)
                );
        } else {
            setGame(null);
        }
    }, [gameId]);

    console.log(gameId);
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <Form action={createPost} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="flex text-lg font-medium mb-2 items-center"
                    >
                        Title
                        <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-lg">
                            Required
                        </span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter your post title ..."
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-lg font-medium mb-2"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Write your post content here ..."
                        rows={6}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <input
                    type="number"
                    name="gameId"
                    value={gameId}
                    readOnly
                    hidden
                />

                <div>
                    <label
                        htmlFor="content"
                        className="block text-lg font-medium mb-2"
                    >
                        Playcount
                    </label>
                    <input
                        type="number"
                        name="played"
                        id="played"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                {game && (
                    <div className="p-4 border rounded-lg bg-gray-700">
                        <h2 className="text-xl font-semibold mb-2">
                            {game.title}
                        </h2>

                        {game.playtime && (
                            <p className="mb-1">
                                <strong>Playtime:</strong> {game.playtime} hours
                            </p>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                >
                    Create Post
                </button>
            </Form>
        </div>
    );
}
